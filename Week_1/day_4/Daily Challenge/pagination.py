import math


class PaginationError(ValueError):
    """Custom exception for pagination errors."""
    pass


class Pagination:
    def __init__(self, items=None, page_size=10):
        if items is None:
            items = []

        self.items = items
        self.page_size = int(page_size)
        self.current_idx = 0

        # Total number of pages
        self.total_pages = (
            math.ceil(len(self.items) / self.page_size)
            if self.page_size > 0
            else 0
        )

    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        page_num = int(page_num)

        # Page numbers < 1 are invalid
        if page_num < 1:
            raise PaginationError("Page number out of range")

        # No items case
        if self.total_pages == 0:
            self.current_idx = 0
            return self

        # If page number exceeds max, go to last page
        if page_num > self.total_pages:
            self.current_idx = self.total_pages - 1
            return self

        # Normal case
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        if self.total_pages == 0:
            self.current_idx = 0
        else:
            self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        return "\n".join(str(x) for x in self.get_visible_items())


# =========================
# TESTS
# =========================

if __name__ == "__main__":
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)

    print(p.get_visible_items())
    # ['a', 'b', 'c', 'd']

    p.next_page()
    print(p.get_visible_items())
    # ['e', 'f', 'g', 'h']

    p.last_page()
    print(p.get_visible_items())
    # ['y', 'z']

    p.go_to_page(10)
    print(p.current_idx + 1)
    # 7

    p.go_to_page(0)
    # Raises ValueError
