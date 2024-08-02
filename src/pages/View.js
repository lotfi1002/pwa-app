import React from "react";
import logo from "../images/logo3.png";

export default function View() {
  return (
    <>
      <button
        className="btn btn-block btn-primary"
        style={{
          borderRadius: "0px",
          marginBottom: "5px",
          textTransform: "uppercase",
        }}
      >
        Imprimer
      </button>


      <button
        className="btn btn-block btn-default"
        style={{
          borderRadius: "0px",
          marginBottom: "5px",
          textTransform: "uppercase",
        }}
      >
        print dot
      </button>
      <style
        dangerouslySetInnerHTML={{
          __html: `
body {
  font-family: Ubuntu, sans-serif;
  color: rgb(0, 0, 0);
}
`,
        }}
      />



      
      
   
<div
        className="bootbox modal fade bootbox-prompt in"
        aria-hidden="false"
        role="dialog"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="bootbox-close-button close"
                type="button"
                aria-hidden="true"
              >
                <i className="fa fa-2x">×</i>
              </button>
              <h4
                className="modal-title"
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              >
                Addresse Email{" "}
              </h4>
            </div>
            <div className="modal-body">
              <div className="bootbox-body">
                <form className="bootbox-form">
                  <input
                    className="bootbox-input bootbox-input-email form-control"
                    type="email"
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ borderTop: "0px", textAlign: "center" }}
            >
              <button
                className="btn btn-default"
                type="button"
                style={{ borderRadius: "0px", marginBottom: "5px" }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                style={{ borderRadius: "0px", marginBottom: "5px" }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
body {
  font-family: Ubuntu, sans-serif;
  color: rgb(0, 0, 0);
}
`,
        }}
      />

      <div id="receiptData">
        <div className="no-print" />
        <div id="receipt-data">
          <div className="text-center">
            <img src={logo} alt="Logo" />
            <h3
              style={{
                fontFamily: "Ubuntu, sans-serif",
                margin: "5px 0px",
                textTransform: "uppercase",
              }}
            >
              XXX 1
            </h3>
            <p>
              3 rue de la libération Dudelange L-3510 Luxembourg
              <br />
              Tél: +352 51 66 64
              <br />
              RCS: B213813
              <br />
              TVA: LU29316600
              <br />
              Site Web: www.sss.eu
              <br />
              Email: contact-clients@ooo.eu
              <br />
            </p>
          </div>
          <p>Date: 23/07/2024 16:36</p>
          <p>Ref:: F/POS2024/07/7754</p>
          <div style={{ clear: "both" }} />
          <table className="table table-condensed">
            <tbody>
              <tr>
                <td
                  className="no-border"
                  colSpan="2"
                  style={{ borderWidth: "0px" }}
                >
                  #1:   JACK DANIEL'S WHISKY 3L 40°
                  <span className="pull-right">*17%</span>
                </td>
              </tr>
              <tr>
                <td
                  className="no-border border-bottom"
                  style={{
                    borderWidth: "0px",
                    borderBottom: "1px solid rgb(221, 221, 221)",
                  }}
                >
                  1,00Pce x 76,50€ [TVA <small>(17%)</small> 13,00€]
                </td>
                <td
                  className="no-border border-bottom text-right"
                  style={{
                    borderWidth: "0px",
                    borderBottom: "1px solid rgb(221, 221, 221)",
                  }}
                >
                  89,50€
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Sous-Total</th>
                <th className="text-right">76,50€</th>
              </tr>
              <tr>
                <td>17%</td>
                <td className="text-right">13</td>
              </tr>
              <tr>
                <th>TOTAL TTC</th>
                <th className="text-right">89,50€</th>
              </tr>
            </tfoot>
          </table>
          <table className="table table-striped table-condensed">
            <tbody>
              <tr>
                <td colSpan="2">Payé par: Cash</td>
                <td colSpan="2">Montant: 89,50€</td>
                <td>Change: 0</td>
              </tr>
            </tbody>
          </table>
          <p className="text-center">Merci de votre achat.</p>
        </div>
        <div className="order_barcodes text-center" style={{ display: "none" }}>
          <img
            className="bcimg"
            alt="F/POS2024/07/7754"
            src="http://localhost/PWA-POS/admin/misc/barcode/Ri9QT1MyMDI0LzA3Lzc3NTQ/code128/74/0/1"
            style={{ marginTop: "5px", cssFloat: "none" }}
          />
          <br />
          <img
            className="qrimg"
            height={100}
            width={100}
            alt="http://localhost/PWA-POS/view/sale/773d6ed46befe857750d3f76c2499396f72a5be68a50e23bd328b5cef7c99ea9"
            style={{
              marginTop: "5px",
              maxWidth: "80px",
              maxHeight: "80px",
              cssFloat: "none",
            }}
          />
        </div>
        <div style={{ clear: "both" }} />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
body {
  font-family: Ubuntu, sans-serif;
  color: rgb(0, 0, 0);
}
`,
        }}
      />
    </>
  );
}
