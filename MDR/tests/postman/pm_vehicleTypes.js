//GET ALL VEHICLE TYPES DTO
if (environment.env === "TESTING") {

    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 2 Vehicle Types", function () {
        pm.expect(res.vehicleTypes.length).to.eql(2);
    });

    pm.test("Vehicle Type _name match expected", function () {
        pm.expect(res.vehicleTypes[0].name).to.eql("2JZ");
        pm.expect(res.vehicleTypes[1].name).to.eql("Bateria Com Rodas");
    });
};

//GET ALL VEHICLE TYPES COMPLETE
if (environment.env === "TESTING") {
    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 2 Vehicle Types", function () {
        pm.expect(res.vehicleTypes.length).to.eql(2);
    });

    pm.test("Vehicle Type names match expected", function () {
        pm.expect(res.vehicleTypes[0].name).to.eql("2JZ");
        pm.expect(res.vehicleTypes[1].name).to.eql("Bateria Com Rodas");
    });

    pm.test("Got all Id's for all the vehicle types", function () {
        pm.expect(res.vehicleTypes[0]._id).to.eql("id_turbo");
        pm.expect(res.vehicleTypes[1]._id).to.eql("id_bat");
    });
};

//GET VEHICLE TYPES BY ID
if (environment.env === "TESTING") {

    var query = {};
    pm.request.url.query.all().forEach((param) => { query[param.key] = param.value });

    var res = null;

    if (query["vehicleType_id"] = "not_found") {
        res = query["vehicleType_id"];
    } else {
        res = pm.response.json();
    }

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("Has correct ID by checking the name", function () {
        var id = query["vehicleType_id"];
        if (id == "id_turbo") {
            pm.expect(res.name).to.eql("2JZ")
        } else if (id == "id_bat") {
            pm.expect(res.name).to.eql("Bateria com Rodas")
        }
        else {
            pm.expect(res).to.eql("not_found")
        };
    });
}
