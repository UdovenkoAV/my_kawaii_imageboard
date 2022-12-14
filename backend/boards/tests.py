from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from PIL import Image
from .models import Post, Category, Board, News, File
from config.models import SiteConfiguration
import io


class BoardsTestCase(TestCase):

    def setUp(self):

        self.client = APIClient()
        SiteConfiguration.objects.create()
        category = Category.objects.create(name='test category')
        board = Board.objects.create(
            name='test board',
            category=category,
            slug='test',
            description='test',
            bump_limit=100,
            pages_limit=5,
            default_username='tester')

        file = File.objects.create(src=self.generate_image_file())
        opost = Post.objects.create(
            post_number=1,
            title='test',
            username='tester',
            email='admin@gmail.com',
            file=file,
            message='This is opost',
            board=board
        )
        Post.objects.create(
            post_number=2,
            title='test2',
            username='another_tester',
            email='user@gmail.com',
            file=None,
            message='This is post in thread',
            parent=opost,
            board=board
        )

    def generate_image_file(self):

        file = io.BytesIO()
        image = Image.new('RGBA', size=(300, 300), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)

        return file

    def test_image_upload(self):

        file = self.generate_image_file()
        response = self.client.post(
            '/api/file_upload/',
            {'file': file},
            format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertIsNotNone(response.data.get('thumbnail'))

    def test_post_new_post(self):

        response = self.client.post('/api/test/new_post', {
            'post_number': 3,
            'title': 'test post',
            'username': 'tester',
            'email': '',
            'file': '',
            'message': 'hello world',
            'parent': Post.objects.first().id
        }, format='json')
        self.assertEqual(response.status_code, 201)

    def test_get_board(self):

        response = self.client.get('/api/test/')
        self.assertEqual(response.status_code, 200)

    def test_get_thread(self):

        response = self.client.get('/api/test/1')
        self.assertEqual(response.status_code, 200)

    def test_dont_get_thread_from_not_opost(self):

        response = self.client.get('/api/test/2')
        self.assertEqual(response.status_code, 404)

    def test_dont_create_opost_without_file(self):

        response = self.client.post('/api/test/new_post', {
            'post_number': 5,
            'title': 'test post',
            'username': 'tester',
            'email': '',
            'file': '',
            'message': 'hello world',
        }, format='json')
        self.assertEqual(response.status_code, 400)


class NewsTestCase(TestCase):

    def setUp(self):

        self.client = APIClient()
        user = User.objects.create(username='Tester')
        News.objects.create(
            author=user,
            title='test',
            message='Hello world'
        )

    def test_get_news(self):

        response = self.client.get('/api/news/')
        self.assertEqual(response.status_code, 200)
