import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../scss/countrycard.scss";
import "../scss/modalStyles.scss";


const MySwal = withReactContent(Swal)

function getCountryDeatils(countryToGet){
  fetch(`https://restcountries.eu/rest/v2/name/${countryToGet}?fields=name;capital;flag;region;subregion;population;currencies;area`)
  .then((response)=>{
    response.json().then((data)=>{      
      showModal(data[0])      
    })
  })
}

function showModal(data){
  MySwal.fire({  
    didOpen: () => {      
      MySwal.clickConfirm()
    }
  })
  
  .then(() => {
    return MySwal.fire(
      <div className="modalContainer">

        <div className="modalHeader">
          <p className="nameCountry">{data.name}</p>  
          <p className="capitalCountry">{data.capital}</p>  
        </div>

        <div className="modalFlag">
          <img style={{width:'50%'}} src={data.flag} alt={data.name}/> 
        </div>   

        <div className="modalBody">

          <div className="bodyItem">
            <p className="title">Region: </p>
            <p className="titleValue">{data.region}</p>   
          </div>

          <div className="bodyItem">
            <p className="title">SubRegion: </p>
            <p className="titleValue">{data.subregion}</p>   
          </div>         

          <div className="bodyItem">
            <p className="title">Population: </p>
            <p className="titleValue">{Intl.NumberFormat().format(data.population)}</p>   
          </div>

          <div className="bodyItem">
            <p className="title">Currencie: </p>
            <p className="titleValue">{data.currencies[0].name}</p>   
          </div>

          <div className="bodyItem">
            <p className="title">Currencie Symbol: </p>
            <p className="titleValue">{data.currencies[0].symbol}</p>   
          </div>

          <div className="bodyItem">
            <p className="title">Area: </p>
            <p className="titleValue">{Intl.NumberFormat().format(data.area)} km</p>   
          </div>
                                   
        </div>     
                                        
      </div>
    )
  }) 
}

const CountryCard = (props) => {
  return (
    <div onClick={()=>{getCountryDeatils(props.countryName)}} className="cardCoontainer">
      <div className="cardHeader">
        <p className="nameCountry">{props.countryName}</p>
        <p className="nameCapital">{props.countryCapital}</p>
      </div>
      <div className="cardBody">
        <img src={props.countryFlag} alt="country"></img>
      </div>      
    </div>
  );
};

export default CountryCard;
