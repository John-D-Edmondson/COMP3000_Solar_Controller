const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('Solar Tilt API', () => {
  // Replace 'your-api-key' with an actual API key for testing
  const apiKey = '1111111111111111';

  describe('GET /', () => {
    it('should return a welcome message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
            console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equal('Hello there!!');
          done();
        });
    });
  });

  describe('POST /calculate-ideal-angle', () => {
    it('should calculate and return the ideal angle for a valid API key', async () => {
    const res = await chai.request(app)
        .post('/calculate-ideal-angle')
        .send({ apiKey });
    
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('elevation');
      expect(res.body).to.have.property('azimuth');
    });

    it('should return a 404 error for an invalid API key', (done) => {
      chai.request(app)
        .post('/calculate-ideal-angle')
        .send({ apiKey: 'invalid-key' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').to.equal('Solar panel not found');
          done();
        });
    });

    // Add more test cases as needed, such as checking the response structure and values
  });
});