describe("Project Http Specification", function(){


	beforeEach(function(){
		bard.appModule('myApp');
		bard.inject('projectFactory', 'apiUrl', '$httpBackend');
	});

	//Add method test
	describe('when add is called', function(){
		it('should add data on success', function(){
			
			var response = {
				data: [{}]
			};
			var project = {};

			$httpBackend.whenPOST(apiUrl + '/projects', project).respond(response);

			projectFactory.add(project).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var project = {};

			$httpBackend.whenPOST(apiUrl + '/projects', project).respond(500);

			projectFactory.add(project).then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	// GetAll test method
	describe('when getAll is called', function(){
		it('should return data summary on success', function(){
			
			var response = {
				data: [{}]
			};

			$httpBackend.whenGET(apiUrl + '/projects').respond(response);

			projectFactory.getAll().then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

				it('it should return error on http fail', function(){
			$httpBackend.whenGET(apiUrl + '/projects').respond(500);

			projectFactory.getAll().then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	//Get by ID test method
	describe('when getById is called', function(){
		it('should return Id on success', function(){
			
			var response = {
				data: [{}]
			};
			var id = {};

			$httpBackend.whenGET(apiUrl + '/projects/' + id).respond(response);

			projectFactory.getById(id).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var id = {};

			$httpBackend.whenGET(apiUrl + '/projects/' + id).respond(500);

			projectFactory.getById(id).then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	//Put method test
	describe('when edit is called', function(){
		it('should edit data on success', function(){
			
			var response = {
				data: [{}]
			};

			var project = {'projectId': 1};

			$httpBackend.whenPUT(apiUrl + '/todos/' + project.projectId, project).respond(response);

			projectFactory.update(project).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var project = {'projectId': 1};

			$httpBackend.whenPUT(apiUrl + '/todos/' + project.projectId, project).respond(500);

			projectFactory.update(project).then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});	

});