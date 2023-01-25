import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

  const[standings, setStandings] = useState([]) // [{}]

  let onGetData = async() => {
    try {
      let response = await axios.get('http://localhost:5000/data')
      console.log(response.data.football.liga1.season.standings)
      setStandings(response.data.football.liga1.season.standings)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    onGetData()
  }, [])

  return (
    <div className="container py-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Club</th>
            <th scope="col">P</th>
            <th scope="col">W</th>
            <th scope="col">D</th>
            <th scope="col">L</th>
            <th scope="col">GS</th>
            <th scope="col">GC</th>
            <th scope="col">GD</th>
            <th scope="col">Point</th>
            <th scope="col">5 Last Match</th>
          </tr>
        </thead>
        <tbody>
          {
            standings.map((value, index)=> {
              return(
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{value.teamName}</td>
                  {
                    value.tables.split(',').map((value, index) => {
                      return(
                        <>
                          <td>{value.split('|')[1]}</td>
                          {/* <td>10</td>
                          <td>9</td>
                          <td>1</td>
                          <td>46</td>
                          <td>25</td>
                          <td>20</td>
                          <td>50</td> */}
                        </>
                      )
                    })
                  }
                  <td>
                    <div className="d-flex">
                      {
                        value.last_match.split(',').map((value, index) => {
                          return(
                            <div className={value === 'w'? "bg-success text-center text-light": value === 'd'? "bg-secondary text-center text-light" : "bg-danger text-center text-light"} style={{ width: '25px', height: '25px', borderRadius: '100%' }}>
                              {value}
                            </div>
                          )
                        })
                      }
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
