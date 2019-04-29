/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodel', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojformlayout'
  , 'ojs/ojlabel'],
  function (oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      this.value = ko.observable();
      self.username = ko.observable("");
      self.password = ko.observable("");
      self.myDept = ko.observable();

      self.ItemCol = ko.observable();


      self.login = function (event) {

        if(self.username() === "test1" && self.password() === "test1"
        || self.username() === "test2" && self.password() === "test2"){

        self.router = oj.Router.rootInstance;
        self.router.configure({
          'incidents': { label: 'To Do', isDefault: true }
        });

        var data = [
          {
            name: 'To Do', id: 'incidents',
            iconClass: 'demo-education-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'
          }];

        var rootViewModel = ko.dataFor(document.getElementById('mainContent'));
        rootViewModel.navDataSource.reset(data, { idAttribute: 'id' });
        rootViewModel.userLogin(self.username());
        rootViewModel.isLoggedIn('true');


        oj.Router.sync();
      }

      };

      //  self.login = function (event) {
      //   var data = JSON.stringify({
      //     "username": "omar",
      //     "password": "omar"
      //   });

      //   var xhr = new XMLHttpRequest();
      //   xhr.withCredentials = true;

      //   xhr.addEventListener("readystatechange", function () {
      //     if (this.readyState === 4) {
      //       console.log(this.responseText);
      //     }
      //   });

      //   xhr.open("GET", "http://localhost:8080/userservice/login");
      //   xhr.setRequestHeader("Content-Type", "application/json");
      //   xhr.setRequestHeader("Accept", "*/*");
      //   xhr.setRequestHeader("Cache-Control", "no-cache");


      //   xhr.send(data);
      //     };

      // self.login = function (event) {

      //   fetch('http://localhost:8080/userservice/login?{"username":"omar","password":"omar"}', {
      //             method: 'GET',

      //             body:JSON.stringify({"username":"omar","password":"omar"})
      //         }).then((res) => res.json())
      //         .then((data) =>  console.log(data))
      //         .catch((err)=>console.log(err))

      // };







      // self.login = function (event) {
      //   console.log(self.username());
      //   $.ajax({
      //     url : 'http://localhost:8080/userservice/login',
      //     method: "GET",
      //     crossDomain: true,
      //     headers: {  'Access-Control-Allow-Origin': 'http://localhost:8080' },
      //     dataType: 'atext/plain',
      //     contentType: 'atext/plain',
      //             dataType: 'json',
      //     data: {"username":"omar","password":"omar"},
      //     success:function(response){

      //         console.log(response);

      //         },
      //     error:function(xhr, status, errorThrown){

      //         console.log(xhr);
      //         console.log(status);
      //         console.log(errorThrown);
      //     }

      // });


      //};



      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
