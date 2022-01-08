sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("northwind.app.odata.northwind.controller.Detail", {
            onInit: function () {
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.oRouter.getRoute("Detail").attachMatched(this._attachPatternMatched, this);
            },
            _attachPatternMatched: function(oEvent){
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();
                oView.bindElement({
                    path: "NorthWind>/Products("+oArgs.productId+")",
                    events: {
                        dataRequested: function (){
                            oView.setBusy(true);
                        },
                        dataReceived: function (){
                            oView.setBusy(false);
                        }
                    }
                });
            },
            handleNavButtonPress: function(){
                this.oRouter.navTo("home");
            },

            handleOrder: function (evt) {
                // show confirmation dialog
                var bundle = this.getView().getModel("i18n").getResourceBundle();
                MessageBox.confirm(
                    bundle.getText("OrderDialogMsg"),
                    function (oAction) {
                        if (MessageBox.Action.OK === oAction) {
                            // notify user
                            var successMsg = bundle.getText("OrderDialogSuccessMsg");
                            MessageToast.show(successMsg);
                            // TODO call proper service method and update model (not part of this tutorial)
                        }
                    },
                    bundle.getText("OrderDialogTitle")
                );
            }
        });
    });
