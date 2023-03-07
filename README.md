# broadcast - A 4Chan clone made in a day

## Instructions:

- Django Server:

  1.  install the dependensies with,
      ```shell
      pip install -r requirements.txt
      ```
  1.  Make DB Migrations with,
      ```shell
      ./manage.py makemigrations
      ```
  1.  Execute Migrations
      ```shell
      ./manage.py migrate
      ```
  1.  start dev server
      ```shell
      ./manage.py runserver
      ```

- NextJS UI:
  1. install Dependencies with,
     ```shell
     npm install
     ```
  1. create a `.env.local` file and add `NEXT_PUBLIC_BROADCAST_API_URL=YOUR-DJANGO-SERVER-URL/api`
  1. start the dev server with
     ```shell
     npm run dev
     ```

## CAN BE IMPROVED:

1. Dockerize the whole thing
1. Only allow to Add Imageboards from the admin Panel
1. Change DB to MySQL
1. update ui when new thread gets added or new reply is added
1. add pagination for threads and thread details page
1. write tests for server
