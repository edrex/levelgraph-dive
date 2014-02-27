deploy: app/.git bower-bundle app-bundle
	cd app/ && \
	git add -A . && \
	git commit -m "Deploy"; \
	git push -f "git@github.com:edrex/levelgraph-dive.git" master:gh-pages

app/.git:
	cd app && \
	git init .

clean: clean-bundles
	rm -f app/*.bundle.js
	rm -rf app/.git

bower-bundle:
	browserify src/libs.js | uglifyjs2 > app/bower.bundle.js
app-bundle:
	browserify src/app.js | uglifyjs2 > app/app.bundle.js

dev-bower-bundle:
	browserify -d src/libs.js > app/bower.bundle.js
dev: dev-bower-bundle
	watchify -d app/app.js -o app/app.bundle.js &
	reload -bd app/