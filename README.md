# CS4610 Assn3 Reptile_Tracker_Frontend

## Stories
### Home Page (the first page I hit when I go to you application) <- Josh

If I am already logged in, then I should be redirected (replace state) to the dashboard page when I reach this page. Otherwise I should be able to do the following:

1. I should see the name of your application
2. I should see a description of what the app does.
3. I should be able to navigate to the Login page
4. I should be able to navigate to the Signup page

### Login Page <- Josh

1. I should be able to sign into a user account
2. I should be able to navigate to the signup page
3. Upon signing in, I should be redirected to the dashboard page

### Signup Page <- Josh

1. I should be able to create a user account
2. I should be able to navigate to the Login page
3. Upon creating an account I should be redirected to the dashboard page

### Dashboard Page

1. I should see all of the schedules for my user for the day of the week it is (for example, if it is Monday then I should only see the schedules that have me doing something on Monday.)
2. I should see a list of all my reptiles
When selecting a reptile the app should navigate to the Reptile page
3. I should be able to create a new reptile (you can do this on this page via something like a pop up, or you can create a new page for this)
4. I should be able to delete a reptile.
5. I should be able to log out of my account

### Reptile Page

1. I should see a list of all of the feedings for this reptile
2. I should see a list of all of the husbandry records for this reptile
3. I should see a list of all of the schedules for this reptile.
4. I should be able to update this reptile
5. I should be able to create a feeding for this reptile
6. I should be able to create a husbandry record for this reptile
7. I should be able to create a schedule for this reptile


# CS4610 Assn2 Reptile_Tracker

## How to run
1. Rename .env.example file to .env
   1. replace \<port-to-listen-on> with 3000
   2. replace \<add-key-here> with your own key
2. In a terminal run the following:
   1. yarn
   2. yarn db:migrate
   3. yarn dev to start the server
   4. or yarn build to build for production
3. The server is running and ready for postman requests.

## Backend

### Stories

1. I should be able to create a user account - Josh
2. I should be able to sign into a user account - Josh
3. I should be able to create a reptile - Josh
4. I should be able to delete a reptile - Josh
5. I should be able to update a reptile - Josh
6. I should be able to list all of my reptiles - Josh
7. I should be able to create a feeding for a reptile - Dave
8. I should be able to list all of the feedings for a reptile - Dave
9. I should be able to create a husbandry record for a reptile - Dave
10. I should be able to list all of the husbandry records for a reptile - Dave
11. I should be able to create a schedule for a - Brad
12. I should be able to list all of the schedules for a reptile - Brad
13. I should be able to list all of the schedules for a user - Brad

