
var Metalsmith = require('metalsmith');
var exec = require('child_process').exec;
var give = require('..');
var assert = require('assert');

describe('metalsmith-give', function(){
  before(function(done){
    exec('rm -rf text/fixtures/*/build', done);
  });

  it('should add metadata to files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(give({
        '*': {
          greeting: 'Hello!'
        }
      }))
      .use(function(){
        return function(files, metalsmith, done) {
          assert(files['file.txt'].greeting == 'Hello!');
          done();
        };
      }())

      .build(function(err){
        if (err) return done(err);
      });

    done();
  });

  it('should add metadata to files with options', function(done){
    Metalsmith('test/fixtures/basic')
      .use(give({
        '*': {
          greeting: 'Hello!'
        },
        options: {
          matchBase: true
        }
      }))
      .use(function(){
        return function(files, metalsmith, done) {
          Object.keys(files).forEach(function(file){
            assert(files[file].greeting == 'Hello!');
          });
          done();
        };
      }())

      .build(function(err){
        if (err) return done(err);
      });

    done();
  });

  it('should perform an advanced metadata-adding routine', function(done){
    Metalsmith('test/fixtures/filter')
      .use(give({
        'about/*': {
          here: 'about'
        },
        'blog/*': {
          here: 'blog'
        }
      }))
      .use(function(){
        return function(files, metalsmith, done) {
          assert(files['about/index.html'].here == 'about');
          assert(files['blog/index.html'].here == 'blog');
          assert(files['blog/posts.post1.html'].here == 'blog');
          assert(files['blog/posts.post2.html'].here == 'blog');
          assert(files['blog/posts.post3.html'].here == 'blog');
          assert(!files['less/main.less'].here);
          assert(!files['less/secondary.less'].here);
          done();
        };
      }())

      .build(function(err){
        if (err) return done(err);
      });

    done();
  });
});
