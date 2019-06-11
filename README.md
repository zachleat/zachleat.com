## Local Development Setup

Prerequisites: Node.js and Ruby

1. Apache Configuration

		<VirtualHost *>
		ServerName zachleat.localhost
		DocumentRoot "/PATH_TO_SITE/_site/"
		</virtualHost>
		
1. Add to `/etc/hosts`

		127.0.0.1	zachleat.localhost

1. `gem install sass`
1. `npm install`
1. `grunt`

## Local Development Workflow

1. `grunt watch`
1. Open `http://zachleat.localhost/`

To install new local npm packages, use `npm install PACKAGE_NAME --save-dev`

## Deploy

1. `grunt deploy`

## Notes

 * [“zachleat.com is Dead, Long Live zachleat.com,” a blog post describing the initial launch](http://www.zachleat.com/web/zachleat-is-dead/)
