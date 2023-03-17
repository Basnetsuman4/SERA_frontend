import { useEffect, useState, useRef } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import "../../css/Dues.css";
import { useToken } from "../../apis";
import { useAuth } from "../../Authentication/auth";
import KhaltiConfig from "./Khalti/khaltiConfig";
import { Input, Label } from "reactstrap";

function Dues() {
  const { tokenInstance } = useToken();
  const [data, setData] = useState([]);
  const [amountpaid, setamountpaid] = useState(0);
  const [description, setdescription] = useState(null);
  const username = useAuth((state) => state.username);
  const message = useAuth((state) => state.message);
  const setAmount = useAuth((state) => state.setAmount);
  const setDescription = useAuth((state) => state.setDescription);
  const setMessage = useAuth((state) => state.setMessage);
  const [image, setImage] = useState(null);
  const [semdue, setsemdue] = useState(null);
  const [val, setval] = useState(null);
  // const [postResult, setPostResult] = useState("");

  const { config } = KhaltiConfig();
  // console.log(config);
  let checkout = new KhaltiCheckout(config);

  useEffect(() => {
    tokenInstance
      .get(`/due/${username}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        setData(err.data.message);
        // console.log(err);
      });
  }, []);
  // console.log(data);

  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // console.log("onload");
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        // console.log("onerror");
        reject(error);
      };
    });
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    console.log("ff", file);
    if (file !== undefined) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    } else {
      setImage(null);
    }
  };
  function handleVoucher() {
    setMessage("Loading..");
    const postData = {
      image: image,
      amount: amountpaid,
      username: username,
      semester: description,
    };
    tokenInstance
      .post(`/voucher`, postData)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      });
  }
  function KhaltiCheck() {
    console.log("ap", amountpaid);
    console.log("d", semdue);
    if (amountpaid / 100 <= semdue) {
      setTimeout(checkout.show({ amount: amountpaid }), 2000);
      toggle();
    } else {
      setMessage(
        "The Amount you entered exceeds the Due limit. Please enter again."
      );
      toggle();
    }
  }
  function handleSelect(sem) {
    tokenInstance.get(`due/${username}/${sem}`).then((res) => {
      setsemdue(res.data.due);
    });
  }
  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="wholeBody">
            <div className="title">
              <h1>Payment Details</h1>
            </div>
            {data.length == 0 && (
              <div className="mainBody">
                <div className="leftDiv">
                  <div className="card1">
                    <div className="inBox">No dues left</div>
                  </div>
                </div>
              </div>
            )}
            {data && (
              <div className="mainBody">
                <div className="leftDiv">
                  <div className="card1">
                    {data.map((singleoption, key) => (
                      <div className="inBox">
                        <h4>
                          Due for {singleoption.semester} semester :{" "}
                          {singleoption.due}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rightDiv">
                  <div className="card2">
                    <div className="c2Head">
                      <span>Select Payment Option</span>
                    </div>
                    <div className="c2Body">
                      <div className="selectDivDue">
                        <div className="inBox">
                          <h4>Description for payment</h4>
                        </div>
                        <br />
                        <Input
                          type="select"
                          name="selectdescription"
                          id="selectdescription"
                          onChange={(e) => {
                            sessionStorage.setItem(
                              "product_Id",
                              e.target.value
                            );
                            setdescription(e.target.value);
                            handleSelect(e.target.value);
                          }}
                        >
                          <option disabled selected value="">
                            --Choose Due--
                          </option>
                          {data.map((singleoption) => (
                            <option value={singleoption.semester}>
                              Due for {singleoption.semester} semester
                            </option>
                          ))}
                        </Input>
                      </div>
                      <div className="displayDiv">
                        <Input
                          type="number"
                          name="amount"
                          id="amount"
                          min="0"
                          required
                          placeholder="Amount Here"
                          onChange={(e) => {
                            setamountpaid(e.target.value * 100);
                          }}
                        ></Input>
                      </div>
                      <div>
                        <Label for="exampleFile">For Voucher Upload</Label>
                        <Input
                          type="file"
                          name="file"
                          id="voucherSelect"
                          label="Image"
                          accept=".jpeg, .png, .jpg"
                          onChange={(e) => onFileSelected(e)}
                        />
                      </div>
                      <div className="paymentBtn">
                        {description !== null && amountpaid !== 0 && (
                          <button
                            id="btn"
                            onClick={() => {
                              setAmount(amountpaid);
                              setDescription(description);
                              KhaltiCheck();
                            }}
                          >
                            <span> Pay Via Khalti </span>{" "}
                          </button>
                        )}

                        {description !== null &&
                          amountpaid !== 0 &&
                          image !== null && (
                            <button
                              id="btn"
                              onClick={() => {
                                handleVoucher();
                                toggle();
                              }}
                            >
                              <span>Upload Voucher </span>{" "}
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="popup">
        <div id="test1" onClick={toggle} className="close">
          +
        </div>
        {message && (
          <div role="alert">
            <pre>{message}</pre>
          </div>
        )}

        <button
          id="test1"
          onClick={() => {
            toggle();
            window.location.reload(true);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
export default Dues;
