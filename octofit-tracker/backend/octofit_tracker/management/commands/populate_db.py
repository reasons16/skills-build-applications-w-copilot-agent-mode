from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):

        # Clear existing data in correct order for Djongo (delete individually)
        for obj in Activity.objects.all():
            obj.delete()
        for obj in Leaderboard.objects.all():
            obj.delete()
        for obj in User.objects.all():
            obj.delete()
        for obj in Workout.objects.all():
            obj.delete()
        for obj in Team.objects.all():
            obj.delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create Activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve, type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=bruce, type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=clark, type='Yoga', duration=20, date=timezone.now().date())

        # Create Workouts
        Workout.objects.create(name='Super Strength', description='Strength training for superheroes', suggested_for='Marvel')
        Workout.objects.create(name='Flight Training', description='Aerobic workout for flyers', suggested_for='DC')

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
