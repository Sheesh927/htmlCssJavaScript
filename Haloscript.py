import math
import random
import sys
import pygame

# Initialize Pygame
pygame.init()

# Screen Dimensions & Settings
WIDTH, HEIGHT = 1000, 600
FPS = 60
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Halo 2D: Master Chief Protocols")

# Color Definitions
COLOR_BG = (20, 25, 35)
COLOR_FLOOR = (60, 70, 85)
COLOR_PLATFORM = (80, 95, 110)
GREEN_CHIEF = (45, 110, 50)
GOLD_VISOR = (230, 180, 30)
BLUE_SHIELD = (80, 190, 255)
RED_COVENANT = (180, 40, 50)
PURPLE_NEEDLER = (180, 60, 200)
YELLOW_AMMO = (255, 220, 50)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)

clock = pygame.time.Clock()

# --- Classes ---


class Player:

    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, 32, 54)
        self.vx = 0
        self.vy = 0
        self.speed = 6
        self.jump_power = -14
        self.gravity = 0.7
        self.is_grounded = False

        # Health & Energy Shields
        self.max_health = 100
        self.health = 100
        self.max_shield = 100
        self.shield = 100
        self.shield_recharge_delay = 120  # frames before recharge starts
        self.shield_timer = 0

        # Aiming & Shooting
        self.angle = 0
        self.shoot_cooldown = 0

    def handle_input(self):
        keys = pygame.key.get_pressed()
        self.vx = 0
        if keys[pygame.K_a] or keys[pygame.K_LEFT]:
            self.vx = -self.speed
        if keys[pygame.K_d] or keys[pygame.K_RIGHT]:
            self.vx = self.speed

        if (
            keys[pygame.K_w] or keys[pygame.K_SPACE] or keys[pygame.K_UP]
        ) and self.is_grounded:
            self.vy = self.jump_power
            self.is_grounded = False

    def update(self, platforms):
        # Physics
        self.vy += self.gravity

        # Horizontal Movement & Collision
        self.rect.x += self.vx
        for platform in platforms:
            if self.rect.colliderect(platform):
                if self.vx > 0:
                    self.rect.right = platform.left
                elif self.vx < 0:
                    self.rect.left = platform.right

        # Vertical Movement & Collision
        self.rect.y += self.vy
        self.is_grounded = False
        for platform in platforms:
            if self.rect.colliderect(platform):
                if self.vy > 0:
                    self.rect.bottom = platform.top
                    self.vy = 0
                    self.is_grounded = True
                elif self.vy < 0:
                    self.rect.top = platform.bottom
                    self.vy = 0

        # Shield Recharge Logic
        if self.shield < self.max_shield:
            self.shield_timer += 1
            if self.shield_timer >= self.shield_recharge_delay:
                self.shield = min(self.max_shield, self.shield + 1.5)
        else:
            self.shield_timer = 0

        if self.shoot_cooldown > 0:
            self.shoot_cooldown -= 1

        # Aim direction relative to mouse position
        mx, my = pygame.mouse.get_pos()
        dx = mx - self.rect.centerx
        dy = my - self.rect.centery
        self.angle = math.atan2(dy, dx)

    def take_damage(self, amount):
        self.shield_timer = 0
        if self.shield > 0:
            self.shield -= amount
            if self.shield < 0:
                self.health += self.shield  # Carry leftover damage to health
                self.shield = 0
        else:
            self.health -= amount

    def draw(self, surface):
        # Body (Armor)
        pygame.draw.rect(surface, GREEN_CHIEF, self.rect, border_radius=4)

        # Visor Direction
        head_x = self.rect.centerx + math.cos(self.angle) * 8
        head_y = self.rect.top + 12 + math.sin(self.angle) * 4
        pygame.draw.circle(
            surface, GOLD_VISOR, (int(head_x), int(head_y)), 5
        )

        # Shield Aura (rendered when taking damage/recharging)
        if self.shield > 0:
            alpha = int((self.shield / self.max_shield) * 100)
            shield_surf = pygame.Surface(
                (self.rect.width + 12, self.rect.height + 12), pygame.SRCALPHA
            )
            pygame.draw.rect(
                shield_surf,
                (*BLUE_SHIELD, alpha),
                shield_surf.get_rect(),
                border_radius=8,
            )
            surface.blit(
                shield_surf, (self.rect.x - 6, self.rect.y - 6)
            )

        # Assault Rifle Gun Barrel
        gun_x = self.rect.centerx + math.cos(self.angle) * 20
        gun_y = self.rect.centery + math.sin(self.angle) * 20
        pygame.draw.line(
            surface,
            GRAY,
            self.rect.center,
            (int(gun_x), int(gun_y)),
            5,
        )


class Enemy:

    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, 30, 48)
        self.vx = random.choice([-2, 2])
        self.health = 40
        self.shoot_cooldown = random.randint(30, 90)

    def update(self, platforms, player_rect):
        # Patrolling movement
        self.rect.x += self.vx
        for platform in platforms:
            if self.rect.colliderect(platform):
                self.vx *= -1
                self.rect.x += self.vx

        if self.shoot_cooldown > 0:
            self.shoot_cooldown -= 1

    def draw(self, surface):
        # Covenant Elite/Grunt Body
        pygame.draw.rect(surface, RED_COVENANT, self.rect, border_radius=5)


class Bullet:

    def __init__(self, x, y, angle, speed=16, is_plasma=False):
        self.x = x
        self.y = y
        self.vx = math.cos(angle) * speed
        self.vy = math.sin(angle) * speed
        self.is_plasma = is_plasma
        self.radius = 4 if not is_plasma else 5
        self.life = 120

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.life -= 1

    def get_rect(self):
        return pygame.Rect(
            int(self.x - self.radius),
            int(self.y - self.radius),
            self.radius * 2,
            self.radius * 2,
        )

    def draw(self, surface):
        color = PURPLE_NEEDLER if self.is_plasma else YELLOW_AMMO
        pygame.draw.circle(
            surface, color, (int(self.x), int(self.y)), self.radius
        )


# --- Game Setup ---
player = Player(100, 400)

platforms = [
    pygame.Rect(0, HEIGHT - 40, WIDTH, 40),  # Floor
    pygame.Rect(150, 450, 200, 20),
    pygame.Rect(420, 370, 200, 20),
    pygame.Rect(700, 280, 200, 20),
    pygame.Rect(250, 200, 250, 20),
]

enemies = [
    Enemy(200, 400),
    Enemy(480, 320),
    Enemy(750, 230),
    Enemy(300, 150),
]

bullets = []
font = pygame.font.SysFont("arial", 18, bold=True)

# --- Main Loop ---
running = True
score = 0

while running:
    clock.tick(FPS)

    # Event Handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Player Actions
    player.handle_input()
    player.update(platforms)

    # Player Shooting
    if pygame.mouse.get_pressed()[0] and player.shoot_cooldown == 0:
        bullets.append(
            Bullet(
                player.rect.centerx,
                player.rect.centery,
                player.angle,
                is_plasma=False,
            )
        )
        player.shoot_cooldown = 8  # Rapid fire rate

    # Enemy Logic & AI Shooting
    for enemy in enemies:
        enemy.update(platforms, player.rect)
        if enemy.shoot_cooldown == 0:
            dx = player.rect.centerx - enemy.rect.centerx
            dy = player.rect.centery - enemy.rect.centery
            angle = math.atan2(dy, dx)
            bullets.append(
                Bullet(
                    enemy.rect.centerx,
                    enemy.rect.centery,
                    angle,
                    speed=8,
                    is_plasma=True,
                )
            )
            enemy.shoot_cooldown = random.randint(60, 100)

    # Bullet Processing
    for bullet in bullets[:]:
        bullet.update()

        # Remove out-of-bounds or old bullets
        if (
            bullet.life <= 0
            or bullet.x < 0
            or bullet.x > WIDTH
            or bullet.y < 0
            or bullet.y > HEIGHT
        ):
            if bullet in bullets:
                bullets.remove(bullet)
            continue

        # Bullet - Platform Collisions
        bullet_rect = bullet.get_rect()
        hit_platform = False
        for platform in platforms:
            if bullet_rect.colliderect(platform):
                hit_platform = True
                break
        if hit_platform:
            bullets.remove(bullet)
            continue

        # Bullet Collisions with Entities
        if bullet.is_plasma:
            # Enemy bullet hitting Master Chief
            if bullet_rect.colliderect(player.rect):
                player.take_damage(18)
                bullets.remove(bullet)
        else:
            # Chief's bullet hitting Covenant Enemy
            for enemy in enemies[:]:
                if bullet_rect.colliderect(enemy.rect):
                    enemy.health -= 25
                    if bullet in bullets:
                        bullets.remove(bullet)
                    if enemy.health <= 0:
                        enemies.remove(enemy)
                        score += 100
                    break

    # --- Drawing Phase ---
    screen.fill(COLOR_BG)

    # Draw Terrain
    for platform in platforms:
        pygame.draw.rect(screen, COLOR_PLATFORM, platform, border_radius=3)

    # Draw Game Entities
    player.draw(screen)
    for enemy in enemies:
        enemy.draw(screen)
    for bullet in bullets:
        bullet.draw(screen)

    # HUD (Shield & Health Bars)
    pygame.draw.rect(screen, (30, 30, 30), (20, 20, 204, 34))

    # Shield Bar (Top Layer)
    shield_w = max(0, int((player.shield / player.max_shield) * 200))
    pygame.draw.rect(screen, BLUE_SHIELD, (22, 22, shield_w, 14))

    # Health Bar (Bottom Layer)
    health_w = max(0, int((player.health / player.max_health) * 200))
    pygame.draw.rect(screen, GREEN_CHIEF, (22, 38, health_w, 12))

    # Text UI
    ui_text = font.render(f"SCORE: {score}", True, WHITE)
    screen.blit(ui_text, (20, 60))

    if player.health <= 0:
        game_over_txt = font.render(
            "MISSION FAILED - CHIEF DOWN", True, RED_COVENANT
        )
        screen.blit(
            game_over_txt, (WIDTH // 2 - 120, HEIGHT // 2)
        )
        pygame.display.flip()
        pygame.time.delay(2000)
        running = False

    pygame.display.flip()

pygame.quit()
sys.exit()