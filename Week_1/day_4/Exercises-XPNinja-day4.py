import time
import copy

class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        self.grid = [[0 for _ in range(cols)] for _ in range(rows)]
        if initial_state:
            for (r, c) in initial_state:
                if 0 <= r < rows and 0 <= c < cols:
                    self.grid[r][c] = 1

    def display(self):
        for row in self.grid:
            print(' '.join(['█' if cell else ' ' for cell in row]))
        print("\n" + "-" * (self.cols * 2))

    def get_neighbours(self, r, c):
        directions = [(-1, -1), (-1, 0), (-1, 1),
                      (0, -1),         (0, 1),
                      (1, -1), (1, 0), (1, 1)]
        count = 0
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < self.rows and 0 <= nc < self.cols:
                count += self.grid[nr][nc]
        return count

    def next_generation(self):
        new_grid = copy.deepcopy(self.grid)
        for r in range(self.rows):
            for c in range(self.cols):
                alive = self.grid[r][c]
                neighbours = self.get_neighbours(r, c)
                if alive:
                    if neighbours < 2 or neighbours > 3:
                        new_grid[r][c] = 0
                else:
                    if neighbours == 3:
                        new_grid[r][c] = 1
        self.grid = new_grid

# Example usage
initial_state = [(1, 2), (2, 2), (3, 2)] 
game = GameOfLife(5, 5, initial_state)

for _ in range(5): 
    game.display()
    game.next_generation()
    time.sleep(1)
