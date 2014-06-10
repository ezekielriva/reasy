SHELL=/bin/bash
SOURCE_FILES=src/*.js
TEST_FILES=test/*.js
DOC_FOLDER=docs

doc:
	mkdir -p ${DOC_FOLDER}
	cat ${SOURCE_FILES} > docs/reasy.js
	./node_modules/docco/bin/docco docs/reasy.js
	mv docs/reasy.html docs/index.html
	rm -rf docs/reasy.js
