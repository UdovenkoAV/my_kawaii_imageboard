from rest_framework import pagination


class ThreadPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return {
            'has_next': self.page.has_next(),
            'has_previous': self.page.has_previous(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'threads': data
            }
