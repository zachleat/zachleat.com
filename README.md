## Local Development Setup

1. Apache Configuration

		<VirtualHost *>
		ServerName zachleat.com.local
		DocumentRoot "/PATH_TO_SITE/"
		Alias /web/ /PATH_TO_SITE/web/_site/
		</virtualHost>
		
1. Add to `/etc/hosts`

		127.0.0.1	zachleat.com.local

1. `npm install`
1. `grunt`
1. Open `http://zachleat.com.local/`