Running this command will run rabbitmq and also open rabbitmq-management-ui port on 15672: `docker run -d -p 5672:5672 -p 15672:15672 --name rmq rabbitmq`

Then you need to jump into the container from docker-desktop (if not installed then modify the command and run it with --exec options) and then the command on the terminal: `rabbitmq-plugins enable rabbitmq_management`.

Then you can access rabbitmq-management-ui on: http://localhost:15672 with default username and password: guest/guest.
