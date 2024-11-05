import { useState, useEffect } from "react";
import './App.css'

function Conp() {

    const [charData, setcharData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchFilter, setsearchFilter] = useState(charData);
    useEffect(() => {
        const fetchData = async () => {
            const rowData = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
            const json = await rowData.json();

            setcharData(json);
            setsearchFilter(json);
        };

        fetchData();

    }, []);


    return (
        <>
            <div style={{ display: 'flex', width: '100%', height: '100px' }}>
                <input placeholder="Search By Name or Symbol" style={{ color: 'white', width: '50%', backgroundColor: 'transparent', height: '100%', marginRight: '5px' }}
                    onChange={
                        (e) => {
                            setSearch(e.target.value)
                            let newData = charData.filter((item) => {
                                return item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.symbol.toLowerCase().includes(e.target.value.toLowerCase())
                            })
                            setsearchFilter(newData);
                        }
                    } />

                <button onClick={
                    () => {
                        let sortedData = [...searchFilter].sort((a, b) => a.market_cap - b.market_cap);
                        setsearchFilter(sortedData);
                    }
                } style={{  width:'25%',
                    backgroundColor: 'transparent',
                    border:'solid 1px white',
                    height:'100%',
                    marginRight:'5px',
                    borderRadius: '0px !important',
                    color:'white'}}>Sort By Mkt Cap</button>
                <button onClick={
                    () => {
                        let sortedData = [...searchFilter].sort((a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
                        setsearchFilter(sortedData);
                    }
                }style={{  width:'25%',
                    backgroundColor: 'transparent',
                    border:'solid 1px white',
                    height:'100%',
                    marginRight:'5px',
                    borderRadius: '0px !important',
                    color:'white'}}>Sort By Percentage</button>
            </div>
            <div>
                <table>
                    <tr style={{ alignItems: 'center', marginRight: '50px' }}>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Name
                        </th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Symbol
                        </th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Current Price
                        </th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Total Volume
                        </th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Market Cap Change Percentage
                        </th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid bisque' }}>
                            Market Cap
                        </th>
                    </tr>

                    {
                        searchFilter.map((item) => {
                            const { id, symbol, image, name, current_price,
                                total_volume, market_cap, market_cap_change_percentage_24h } = item;
                            return <tr >
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={image} alt={name} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                        <p>{name}</p>
                                    </div>
                                </td>
                                <td>
                                    <p>{symbol}</p>
                                </td>
                                <td>
                                    <p>${current_price}</p>
                                </td>
                                <td>
                                    <p>${total_volume}</p>
                                </td>
                                <td style={{ color: market_cap_change_percentage_24h < 0 ? 'red' : 'green' }}>{market_cap_change_percentage_24h * 100}%</td>
                                <td>
                                    <p> Mkt Cap : ${market_cap}</p>
                                </td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default Conp;
