/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcollectiondataprovider', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel'
  , 'ojs/ojknockout', 'ojs/ojmodel', 'ojs/ojtable', 'ojs/ojcheckboxset',
  'ojs/ojcollectiontabledatasource', 'ojs/ojinputnumber', 'ojs/ojinputtext', 'ojs/ojdialog', 'ojs/ojbutton'],
  function (oj, ko, $, CollectionDataProvider) {

    function IncidentsViewModel() {
      var self = this;

      var rootViewModel = ko.dataFor(document.getElementById('mainContent'));


      self.somethingChecked = ko.observable(false);
      self.newItem = ko.observable('');
      self.ItemCol = ko.observable();
      self.datasource = ko.observable();

      self.url = 'http://localhost:8080/todoService/todo';
      self.serverurl = 'http://localhost:8080/todoService/usersTodo/'+ rootViewModel.userLogin();

      // find 
      self.findItemsIds = function () {
        var selectedIdsArray = [];
        $("oj-checkboxset").each(function () {
          var cb = $(this);
          var cbComp = document.getElementById(cb.attr("id"));
          if (cbComp.value && cbComp.value.length) {
            selectedIdsArray.push(cbComp.value[0]);
          }
        });
        return selectedIdsArray;
      }


      // Deletion handlers/helpers
      self.enableDelete = function (event) {
        self.somethingChecked(event && event.target && event.target.value && event.target.value.length);
      }
      //Delete
      self.deleteItems = function (data, event) {
        var ItemsIds = [];
        ItemsIds = self.findItemsIds();
       
        ItemsIds.forEach(function (value, index, arr) {

          var settings = {

            "crossDomain": true,
            "url": "http://localhost:8080/todoService/todo/" + value,
            "method": "DELETE"

          }

          $.ajax(settings).done(function (response) {
            console.log(response);
          });


          document.getElementById("table").refresh();
        });

        self.todoList = self.createEmployeeCollection();
         self.datasource = ko.observable(new CollectionDataProvider(self.todoList));

      };

      ////
      




      // add Iteam


      self.create = function (event) {
        if (self.newItem() != '') {
          
 
          console.log(rootViewModel.userLogin());

          var recordAttrs = { todo: self.newItem(), status: 'New', userId: rootViewModel.userLogin() };
          self.todoList.create(recordAttrs, {
            wait: true,
            mode: "no-cors",
            
            contentType: 'application/json',
            success: function (model, response) {

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
          });
        }
        self.newItem('');
      };


      // all Itemas 

      self.createEmployeeModel = function () {
        var employeeModel = oj.Model.extend({
          urlRoot: self.serverurl,
          idAttribute: 'userId'
        });
        return new employeeModel();
      };

      self.createEmployeeCollection = function () {
        var employeeCollection = oj.Collection.extend({
          url: self.serverurl,
          fetchSize: 100,
          model: self.createEmployeeModel()
        });
        return new employeeCollection();
      };


      self.todoList = self.createEmployeeCollection();
      self.datasource = ko.observable(new CollectionDataProvider(self.todoList));






      //
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
    return new IncidentsViewModel();
  }
);
