import { useState } from "react";
import axios from 'axios'
import './css/Home.css'
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Link } from "react-router-dom";




// 16 gb ram 30 50 gpu ddr5 ssd 512
const Home = () => {

  // const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  // const handleLogout = () => {
  //   axios.get('http://localhost:3001/logout')
  //     .then(res => {
  //       if (res.data.status) {
  //         navigate('/')
  //       }
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // }

  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [heightErr, setHeightErr] = useState("");
  let [weightErr, setWeightErr] = useState("");
  let [bmiValue, setBmiValue] = useState("");
  let [bmiText, setBmiText] = useState("");
  let [chonkVisibility, setChonkVisibility] = useState("invisibleChonk");
  let [text, setText] = useState("");
  let [resultChonk, setResultChonk] = useState("visibleChonk");
  let AllChonkImg = {
    slimChonk: [
      
      "../public/images/slim/muscle.png",
      "../public/images/slim/whey.jpg",
      "../public/images/slim/fishfillet.jpg",

    ],
    normalChonk: [
      "../public/images/normal/coffeemilkshake.jpg",
      "../public/images/normal/health.jpg",
      "../public/images/normal/2.gif",
      "../public/images/normal/3.jpg",

    ],
    fatChonk: [
      "../public/images/fat/1.png",
      "../public/images/fat/2.png",
      "../public/images/fat/veg.jpg",

    ],
    tooFatChonk: [
      "../public/images/2fat/gym_diet.png",
      "../public/images/2fat/trail.jpeg",
      "../public/images/2fat/Sauteed.jpg",
    ],
  };

  const minHeight = 95;
  const maxHeight = 220;
  const minWeight = 10;
  const maxWeight = 300;
  const slimThre = 18.5;
  const normalThre = 24.9;
  const fatThre = 29.9;



  const handleHeightChange = (event) => {
    //spinner
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    //spinner
    setWeight(event.target.value);
  };

  const handleHeightSliderChange = (value) => {
    //range
    setHeight(value);
  };

  const handleWeightSliderChange = (value) => {
    //range
    setWeight(value);
  };

  //limiting input to numbers
  const handleKeyPress = (source, event) => {
    let allowedChars = ".0123456789";
    let currentChar = event.key;
    let found = false;
    for (let i = 0; i < allowedChars.length; i++) {
      if (currentChar === allowedChars[i]) {
        found = true;
      }
    }
    if (found === false) {
      event.preventDefault();
      return;
    }

    //limiting number input in height/weight
    let currentValue = "";
    if (source === "height") {
      currentValue = parseInt(height + currentChar);
      if (currentValue > maxHeight) {
        event.preventDefault();
      }
    } else {
      currentValue = parseInt(weight + currentChar);
      if (currentValue > maxWeight) {
        event.preventDefault();
      }
    }

    if (currentValue === 0) {
      event.preventDefault();
    }
  };

  //classifying the results w/images, calculating BMI
  const classifyResult = (result) => {
    if (result < slimThre) {
      return "slim";
    }
    if (result <= normalThre) {
      return "normal";
    }
    if (result <= fatThre) {
      return "fat";
    }
    return "tooFat";
  };

  //height, weight validation and min/max manual input nrs
  const validate = () => {
    setHeightErr("");
    setWeightErr("");

    let heightErrStr = "";
    let weightErrStr = "";

    //error messageges for H/W
    if (!height) {
      heightErrStr = "Please, enter height";
    } else if (height < minHeight) {
      heightErrStr = "Greater than 95, please";
    } else if (height > maxHeight) {
      heightErrStr = "Less than 220, please";
    }

    if (!weight) {
      weightErrStr = "Please, enter weight";
    } else if (weight < minWeight) {
      weightErrStr = "Greater than 10, please";
    } else if (weight > maxWeight) {
      weightErrStr = "Less than 300, please";
    }

    if (heightErrStr || weightErrStr) {
      setHeightErr(heightErrStr);
      setWeightErr(weightErrStr);
      return false;
    }
    return true;
  };

  //calc BMI
  const calcBmi = (event) => {
    if (!validate()) {
      return;
    }

    let bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);
    let chonks = null;
    let resultString = "";

    switch (classifyResult(bmi)) {
      case "slim": {
        chonks = AllChonkImg.slimChonk;
        resultString = "You're quite slim. Consider a balanced diet and regular exercise to ensure that you are getting the necessary nutrients and maintaining muscle mass. \n\nRecommended Foods: \n- Whole grains \n- Lean proteins (chicken, fish, tofu) \n- Healthy fats (avocado, nuts, seeds) \n- Fruits and vegetables. \n\nWorkout Activities: \n- Strength training \n- Yoga \n- Pilates \n- Light cardio.";
        break;
      }
      case "normal": {
        chonks = AllChonkImg.normalChonk;
        resultString = "Your weight is in the normal range. Maintaining a healthy weight reduces your risk of developing various health conditions, including heart disease, diabetes, and certain cancers. \n\nRecommended Foods: \n- Variety of fruits and vegetables \n- Whole grains \n- Lean proteins \n- Healthy fats (olive oil, nuts). \n\nWorkout Activities: \n- Mix of cardio (running, cycling) \n- Strength training \n- Flexibility exercises.";
        break;
      }
      case "fat": {
        chonks = AllChonkImg.fatChonk;
        resultString = "You are slightly overweight. Making small, sustainable changes to your lifestyle can help you achieve and maintain a healthier weight. \n\nRecommended Foods: \n- High-fiber foods (vegetables, legumes) \n- Lean proteins \n- Whole grains \n- Low-fat dairy. \n\nWorkout Activities: \n- Cardio exercises (walking, swimming) \n- Strength training \n- High-intensity interval training (HIIT).";
        break;
      }
      case "tooFat": {
        chonks = AllChonkImg.tooFatChonk;
        resultString = "You are in the obese range. \n\nRecommended Foods: \n- High-fiber foods \n- Lean proteins \n- Vegetables and fruits \n- Whole grains. \n\nWorkout Activities: \n- Low-impact exercises (walking, water aerobics) \n- Strength training \n- Consistent cardio exercises.";
        break;
      }

    }

    //getting random images & avoiding duplicates
    let randNum = Math.floor(Math.random() * chonks.length);
    let randChonk = chonks[randNum];

    if (resultChonk === randChonk) {
      calcBmi(event);
      return;
    }

    setResultChonk(randChonk);
    setChonkVisibility("visibleChonk");
    setBmiText(resultString);
    setBmiValue(bmi);
    setText("invisibleChonk");
  };

  //clear button
  const clear = (event) => {
    event.preventDefault();
    setHeight("");
    setWeight("");
    setBmiValue("");
    setChonkVisibility("invisibleChonk");
    setHeightErr("");
    setWeightErr("");
    setText("visibleChonk");
  };

  // select health conditions
  const [selectedCondition, setSelectedCondition] = useState('');
  const healthConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Anaemia',
  ];


  // gender selection
  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);   
  };

  const handleSubmit = () => {
    
  };

   const handlePrint = () => {
    window.print();
  };

  return (

    <div id="container">
      {/* <button onClick={handleLogout}>Logout</button> */}

     
      <div id="title">
        <h1>Check health status</h1>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className='unit'>
          <p>Age</p>
          <input type='number' placeholder='Enter' className='form-control' name='' onChange="" />
        </div>

        <div className="unit">
          <p>Gender</p>
          <select
            className='form-control'
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="unit">
          <p>Muscle Mass</p>
          <input type='number' placeholder='g' className='form-control' name='' onChange="" />
        </div>

        <div className="unit">
          <p>BMR</p>
          <input type='number' placeholder='kcal/day' className='form-control' name='' onChange="" />
        </div>

        <div className="unit">
          <p>Health condition</p>
          <select
            className='form-control'
            value={selectedCondition}
            onChange={handleConditionChange}
          >
            <option value="">--Select Condition--</option>
            {healthConditions.map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
              </option>
            ))}
          </select>


        </div>


        <div className="unit">
          <p>Height (95cm-220cm)</p>
        </div>
        <input
          type="number"
          name="height"
          step="1"
          placeholder="cm"
          min={minHeight}
          max={maxHeight}
          value={height}
          onChange={handleHeightChange}
          onKeyPress={handleKeyPress.bind(this, "height")}
        />

        <div className="error">{heightErr}</div>

        <div className="slider">
          <Slider
            min={minHeight}
            max={maxHeight}
            step={1}
            value={height}
            onChange={handleHeightSliderChange}
          />
        </div>

        <br />

        <div className="unit">
          <p>Weight (10kg-300kg)</p>
        </div>
        <input
          type="number"
          name="weight"
          step="0.5"
          placeholder="kg"
          min={minWeight}
          max={maxWeight}
          value={weight}
          onChange={handleWeightChange}
          onKeyPress={handleKeyPress.bind(this, "weight")}
        />

        <div className="error">{weightErr}</div>

        <div className="slider">
          <Slider
            min={minWeight}
            max={maxWeight}
            step={0.5}
            value={weight}
            onChange={handleWeightSliderChange}
          />
        </div>



        <br />

        <div id="buttons-container">
          <button
            className="button"
            onClick={(event) => {
              event.preventDefault();
              calcBmi();
            }}
          >
            Curate
          </button>

          <br />

          <button className="button" onClick={clear}>
            Clear
          </button>
        </div>

        <br />
      </form>

      <div className={chonkVisibility}>
        <div id="image">
          <img src={resultChonk} alt="" />
        </div>
        <div id="result-top-text">
          <p>Your current BMI: {bmiValue} </p>
        </div>
        <div id="bmi-text">{bmiText}</div>
      </div>

      <div className={text}>
        <div id="text">
          Body mass index, abbreviated BMI, is a key index for relating weight
          to height.
          <br />
          <br />
          BMI is a persons weight in kilograms (kg) divided by his or her
          height in meters squared. The National Institutes of Health (NIH) now
          defines normal weight, overweight, and obesity according to BMI rather
          than the traditional height/weight charts.
          <ul>
            <li>Overweight is a BMI of 25–29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks.
        </div>
      </div>


     
        <button onClick={handlePrint}>
          [Print]
        </button>
     


    </div>
  );
};



export default Home;
