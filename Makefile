all: app.js web/chart.js

%.js: %.coffee
	coffee -cb $?
