import Pair from "../components/Pair";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState, version } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export async function getStaticProps() {
  const res = await fetch(`https://api.exchangerate.host/symbols`);
  const data = await res.json();
  const symbols = data.symbols;

  return {
    props: {
      symbols,
    }
  };
}

export default function Dashboard(props) {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});

  useEffect(() => {
    setBase(localStorage.getItem("base"))
    console.log(base)
  }
    ,[])

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest?base=${base}`)
      .then(res => res.json())
      .then(data => {
        setRates(data.rates);
      })
  }, [base]);

  const handleChange = (event) => {
    setBase(event.target.value);
    localStorage.setItem("base",event.target.value)
  };

  return (
    <>
      {/* Mapping the select options currencies using static rendering */}

      <Box sx={{ display: "grid", placeItems: "center", rowGap: 10, my: 10 }}>
        <div>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Base Currency</InputLabel>
            <Select value={base} id="baseCurrency" onChange={handleChange}>
              {Object.keys(props.symbols).map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Mapping the currency pairs using the base state variable and Pair component using client-side rendering*/}

        <Box sx={{ maxWidth: 1200 }}>
          <Grid
            container
            spacing={8}
            sx={{ display: "flex", justifyContent: "center" }}
            columns={9}
          >
            {Object.entries(rates).map((v) => (
              <Grid key{v} item md={2.1} lg={1.65}>
                <Item sx={{ backgroundColor: 'whitesmoke'}}>
                  <Pair pair={base + "/" + v["0"]} rate={v["1"]} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
