import React from "react";
import { COMPANY_ADDRESS, COMPANY_NAME } from "src/utils/company_details";

const RecieptTemplate = React.forwardRef((props, ref) => {
  const { salesReciept } = props;

  return (
    <div ref={ref} className="main-reciept-container">
      <div className="wrapper">
        <div className="invoice_wrapper">
          <div className="header">
            <div className="logo_invoice_wrap">
              <div className="logo_sec">
                {/* <h4>{COMPANY_NAME}</h4> */}
                <div className="title_wrap">
                  <p className="title bold">{COMPANY_NAME}</p>
                  <p className="sub_title">{`${COMPANY_ADDRESS}, Tel: 08117729805.`}</p>
                </div>
              </div>
              <div className="invoice_sec">
                <p className="invoice_no">
                  <span className="bold">Invoice:</span>
                  <span>{salesReciept.invoice_number}</span>
                </p>
                <p className="date">
                  <span className="bold">Date:</span>
                  <span>{salesReciept.created_at}</span>
                </p>
              </div>
            </div>
            <div className="bill_total_wrap">
              <div className="bill_sec">
                {/* <p>Bill To</p> 
                <p className="bold name">{salesReciept.c}</p>
                <span>
                  123 walls street, Townhall<br />
                  +111 222345667
                </span> */}
              </div>
              {/* <div className="total_wrap">
                <p>Total Due</p>
                <p className="bold price">NGN:{salesReciept.total_amount}</p>
              </div> */}
            </div>
          </div>
          <div className="body">
            <div className="main_table">
              <div className="table_header">
                <div className="row">
                  <div className="col col_no">NO.</div>
                  <div className="col col_des">ITEM </div>
                  <div className="col col_price">PRICE</div>
                  <div className="col col_qty">QTY</div>
                  <div className="col col_total">TOTAL</div>
                </div>
              </div>
              <div className="table_body">
                {salesReciept?.items?.map((item, i) => (
                  <div key={i} className="row">
                    <div className="col col_no">
                      <p>{i + 1}</p>
                    </div>
                    <div className="col col_des">
                      <p className="bold">{item.product}</p>
                    </div>
                    <div className="col col_price">
                      <p>
                        {item.original_selling_price != ""
                          ? item.original_selling_price
                          : item.incoming_selling_price}
                      </p>
                    </div>
                    <div className="col col_qty">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="col col_total">
                      <p>{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="paymethod_grandtotal_wrap">
              <div className="paymethod_sec">
                <p className="bold">Payment Method</p>
                <p>{salesReciept.payment_type}</p>
              </div>
              <div className="grandtotal_sec">
                <p className="bold">
                  <span>SUB TOTAL</span>
                  <span>₦{salesReciept.total_amount}</span>
                </p>
                <p>
                  <span>Tax Vat</span>
                  <span>N/A</span>
                </p>
                <p>
                  <span>Discount 10%</span>
                  <span>N/A</span>
                </p>
                <p className="bold">
                  <span>Grand Total</span>
                  <span>₦{salesReciept.total_amount}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="terms">
              <p className="tc bold">Note:</p>
              <p>Goods bought in good shape cannot be returned.</p>
            </div>
            <p>Thank you and Best Wishes</p>
            <div className="powered-by">
              <p className="consultant-name">Powered by Dayon Consult</p>
              <p className="phone">07033548020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RecieptTemplate;
