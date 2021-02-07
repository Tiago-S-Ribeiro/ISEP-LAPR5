//Get Lines
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 7 lines", function () {
    pm.expect(res.lines.length).to.eql(7);
});

pm.test("Line key match expected", function () {
    pm.expect(res.lines[0].key).to.eql("Line:1");
    pm.expect(res.lines[1].key).to.eql("Line:3");
    pm.expect(res.lines[2].key).to.eql("Line:5");
    pm.expect(res.lines[3].key).to.eql("Line:4");
    pm.expect(res.lines[4].key).to.eql("Line:2");
    pm.expect(res.lines[5].key).to.eql("LINE_1");
    pm.expect(res.lines[6].key).to.eql("LALAL");
});

//Get a line by id
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("Line key match expected", function () {
    pm.expect(res.line.key).to.eql("Line:1");
});

pm.test("Line name match expected", function () {
    pm.expect(res.line.name).to.eql("Paredes_Aguiar");
});

//Get Paths by Line
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 2 linePaths", function () {
    pm.expect(res.line.linePaths.length).to.eql(2);
});

pm.test("Line key match expected", function () {
    pm.expect(res.line.key).to.eql("Line:1");
});

pm.test("LinePaths keys match expected", function () {
    pm.expect(res.line.linePaths[0].key).to.eql("LinePath:12");
    pm.expect(res.line.linePaths[1].key).to.eql("LinePath:13");
});

//Get Lines Complete
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 20 lines", function () {
    pm.expect(res.lines.length).to.eql(7);
});

pm.test("Line keys match expected", function () {
    pm.expect(res.lines[0].key).to.eql("Line:1");
    pm.expect(res.lines[1].key).to.eql("Line:3");
    pm.expect(res.lines[2].key).to.eql("Line:5");
    pm.expect(res.lines[3].key).to.eql("Line:4");
    pm.expect(res.lines[4].key).to.eql("Line:2");
    pm.expect(res.lines[5].key).to.eql("LINE_1");
    pm.expect(res.lines[6].key).to.eql("LALAL");
});

pm.test("Line colors match expected", function () {
    pm.expect(res.lines[0].color).to.eql([38,91,11]);
    pm.expect(res.lines[1].color).to.eql([4,204,225]);
    pm.expect(res.lines[2].color).to.eql([152,16,147]);
    pm.expect(res.lines[3].color).to.eql([183,248,71]);
    pm.expect(res.lines[4].color).to.eql([49,23,59]);
    pm.expect(res.lines[5].color).to.eql([1,2,8]);
    pm.expect(res.lines[6].color).to.eql([1,2,8]);
});
