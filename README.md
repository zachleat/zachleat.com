## Local Development Setup

Prerequisites: Node.js and Ruby

1. Apache Configuration

		<VirtualHost *>
		ServerName zachleat.com.local
		DocumentRoot "/PATH_TO_SITE/"
		Alias /web/ /PATH_TO_SITE/web/_site/
		</virtualHost>
		
1. Add to `/etc/hosts`

		127.0.0.1	zachleat.com.local

1. `gem install sass`
1. `npm install`
1. `grunt`

## Local Development Workflow

1. `grunt watch`
1. Open `http://zachleat.com.local/`

To install new local npm packages, use `npm install PACKAGE_NAME --save-dev`

## Notes

 * [“zachleat.com is Dead, Long Live zachleat.com,” a blog post describing the initial launch](http://www.zachleat.com/web/zachleat-is-dead/)
 * [Valid pygments lexers](http://pygments.org/languages/)
