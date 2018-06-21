var controller = require('./../../../../controllers/movies');
let server = require('./../../../../server');
let Movie = require('../../../../models/Movie');
let chaiHttp = require('chai-http');
let chai = require('chai');
let sinon = require('sinon');
var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe('controllers.movies.js', function(){
  it('exists', function(){
    expect(controller).to.exist
  })

  describe('/GET movies', () => {
    it('it should send all movies', (done) => {
      var movie1 = {
        name: 'test1',
        description: 'test1',
        release_year: 2017,
        genre: 'test1'
      };
      var movie2 = {
        name: 'test2',
        description: 'test2',
        release_year: 2018,
        genre: 'test2'
      };
      var expectedMovies = [movie1, movie2];
      sinon.mock(Movie)
        .expects('find')
        .yields('', expectedMovies);
      chai.request(server)
        .get('/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object')
          expect(res.body).to.eql({
            movies: expectedMovies
          });
          done();
        });
    });
  });

  describe('POST /movies', () => {
    it('should respond with the movie that was added', (done) => {
      chai.request(server)
        .post('/movies')
        .send({
          name: 'test1',
          description: 'test1',
          release_year: 2018,
          genre: 'test1'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.an('object')
          res.body.should.include.keys(
            '_id', 'name', 'description', 'release_year', 'genre'
          );
          done();
        });
    });
  });
})
