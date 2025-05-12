import pygame
import sys
import random
import math
from pygame import Vector2

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
FPS = 60

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)

class Target:
    def __init__(self):
        self.radius = 20
        self.reset()
        self.speed = random.uniform(2, 4)
        self.direction = Vector2(random.uniform(-1, 1), random.uniform(-1, 1)).normalize()
        
    def reset(self):
        self.pos = Vector2(
            random.randint(self.radius, WINDOW_WIDTH - self.radius),
            random.randint(self.radius, WINDOW_HEIGHT - self.radius)
        )
        
    def update(self):
        self.pos += self.direction * self.speed
        
        # Bounce off walls
        if self.pos.x - self.radius < 0 or self.pos.x + self.radius > WINDOW_WIDTH:
            self.direction.x *= -1
        if self.pos.y - self.radius < 0 or self.pos.y + self.radius > WINDOW_HEIGHT:
            self.direction.y *= -1
            
    def draw(self, screen):
        pygame.draw.circle(screen, RED, (int(self.pos.x), int(self.pos.y)), self.radius)

class Projectile:
    def __init__(self, start_pos, target_pos):
        self.pos = Vector2(start_pos)
        self.speed = 10
        direction = Vector2(target_pos) - Vector2(start_pos)
        if direction.length() > 0:  # Prevent division by zero
            self.velocity = direction.normalize() * self.speed
        else:
            self.velocity = Vector2(0, 0)
        self.radius = 5
        
    def update(self):
        self.pos += self.velocity
        
    def draw(self, screen):
        pygame.draw.circle(screen, BLUE, (int(self.pos.x), int(self.pos.y)), self.radius)
        
    def is_off_screen(self):
        return (self.pos.x < 0 or self.pos.x > WINDOW_WIDTH or 
                self.pos.y < 0 or self.pos.y > WINDOW_HEIGHT)

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("League of Legends Skill Shot Trainer")
        self.clock = pygame.time.Clock()
        self.target = Target()
        self.projectiles = []
        self.score = 0
        self.shots_fired = 0
        self.font = pygame.font.Font(None, 36)
        
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left click
                    mouse_pos = Vector2(pygame.mouse.get_pos())
                    self.projectiles.append(Projectile(mouse_pos, mouse_pos))
                    self.shots_fired += 1
        return True
        
    def update(self):
        self.target.update()
        
        # Update projectiles
        for projectile in self.projectiles[:]:
            projectile.update()
            
            # Check for collisions
            if (projectile.pos - self.target.pos).length() < self.target.radius:
                self.score += 1
                self.target.reset()
                self.projectiles.remove(projectile)
            elif projectile.is_off_screen():
                self.projectiles.remove(projectile)
                
    def draw(self):
        self.screen.fill(BLACK)
        
        # Draw target
        self.target.draw(self.screen)
        
        # Draw projectiles
        for projectile in self.projectiles:
            projectile.draw(self.screen)
            
        # Draw score and accuracy
        accuracy = (self.score / max(1, self.shots_fired)) * 100
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        accuracy_text = self.font.render(f"Accuracy: {accuracy:.1f}%", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        self.screen.blit(accuracy_text, (10, 50))
        
        pygame.display.flip()
        
    def run(self):
        running = True
        while running:
            running = self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(FPS)
            
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    game = Game()
    game.run() 