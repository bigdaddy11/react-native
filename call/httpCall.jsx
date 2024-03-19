
// export default function httpCall({
//     param, 
//     method,
//     url,
// }){
//     return (
//         fetch(url, {
//             method: method,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "*"
//             },
//             body: param,
//         })
//         .then((response) => {
//             return response();
//         })
//         .then((data) => {
//              return data;
//         })
//     );
// };

import { Component } from 'react';

const ServerEndPoint = "http://localhost:8080";

class httpCall extends Component {
  constructor(props) {
    super(props);
    this.useState = { data: [] }
  }

  async componentDidMount() {
    let { data: data } = await axios.get(ServerEndPoint);
    this.setState({data});
  }

  render(){
    const { data } = this.state;

    if(data.lentgh > 0){
      
    }
  }
};

export default httpCall;