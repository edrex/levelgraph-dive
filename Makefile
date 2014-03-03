deploy: app/.git webpack
	cd app/ && \
	git add -A . && \
	git commit -m "Deploy"; \
	git push -f "git@github.com:edrex/levelgraph-dive.git" master:gh-pages

app/.git:
	cd app && \
	git init .

clean:
	rm -f app/*.bundle.js

reallyclean: clean
	rm -rf app/.git

webpack:
	webpack --optimize-minimize

dev:
	webpack-dev-server --content-base app -d

dev2:
	webpack --watch & \
	cd app && reload -bd