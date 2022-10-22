import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import Box from '@mui/material/Box'

export default function Pair({ pair, rate }) {
  return (
    <Card
      variant="outlined"
      sx={{ height: 150, width: 150, borderWidth: 1.5, borderColor: "#e5e5e5" }}
    >
      <CardContent >
        <Box sx={{ fontFamily: 'serif', fontSize: 'h6.fontSize', my: 2, fontWeight: 'bold'}}>{pair}</Box>
        <Box sx={{ fontFamily: 'initial',fontSize: 'h6.fontSize', m: 0, marginTop:3 }}>{rate}</Box>
      </CardContent>
    </Card>
  );
}
