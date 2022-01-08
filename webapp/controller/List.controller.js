sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("northwind.app.odata.northwind.controller.List", {
            onInit: function () {
                  
            },
            handleListItemPress: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var selectedProductId = oEvent.getSource().getBindingContext("NorthWind").getProperty("ProductID");
                oRouter.navTo("Detail",{
                    productId: selectedProductId
                });
            },

            handleSearch: function(oEvent){
                var filters = [];
                var query = oEvent.getParameter("query");
                if(query && query.length > 0){
                    filters.push(new Filter("ProductName", FilterOperator.Contains, query));
                }

                var oList = this.getView().byId("list");
                var binding = oList.getBinding("items");
                binding.filter(filters); 
            }
        });
    });
