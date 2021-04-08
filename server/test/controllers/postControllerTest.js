const chai = require("chai");
const expect = chai.expect;
const postController = require("../../controllers/post");
const auth = require("../../middleware/auth");

describe.only("getPosts", function () {
  it("should return json file and status 200", function () {
    postController.getPosts(auth, function (res) {
      expect(res).to.have.status(200);
      expect(res).to.be.a.jsonFile();
    });
  });
});
