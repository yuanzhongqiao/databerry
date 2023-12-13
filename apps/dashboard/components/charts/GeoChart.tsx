import {
  Box,
  Card,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/joy';
import React, { memo } from 'react';
import { Chart } from 'react-google-charts';

type Props = {
  label: string;
  data: any[];
  totalConversation: number;
};

const ProgressBar = ({ total, amount }: { total: number; amount: number }) => {
  const progress = total > 0 ? (amount / total) * 100 : 0;
  return (
    <Box sx={{ width: '100%', mr: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress determinate value={progress} />
        </Box>
      </Box>
    </Box>
  );
};

const BarChartRow = ({
  country,
  chats,
  totalConversation,
}: {
  country: string;
  chats: number;
  totalConversation: number;
}) => {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ py: 1 }}
      >
        <Box sx={{ fontWeight: 'medium' }}>{country}</Box>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              height: '8px',
              backgroundColor: 'primary.main',
              borderRadius: 'sm',
            }}
          />
          <Box sx={{ fontWeight: 'medium' }}>{chats}</Box>
        </Stack>
      </Stack>
      <ProgressBar total={totalConversation} amount={chats} />
    </Stack>
  );
};

const BarChartTable = ({
  data,
  totalConversation,
}: Pick<Props, 'data' | 'totalConversation'>) => {
  return (
    <Box
      sx={{
        maxWidth: 'lg',
        px: 1,
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        divider={<Divider orientation="horizontal" />}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            py: 1,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: 'background.body',
          }}
        >
          <Typography level="title-lg">Country</Typography>
          <Typography level="title-lg">Chats</Typography>
        </Stack>

        {data.map(([country, chats], index) => (
          <BarChartRow
            key={index}
            country={country}
            chats={chats}
            totalConversation={totalConversation}
          />
        ))}
      </Stack>
    </Box>
  );
};

function GeoChart({ label, data, totalConversation }: Props) {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const convertedData = data.map(([country, chats]) => [
    regionNames.of(country),
    chats,
  ]);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8}>
        <Chart
          chartType="GeoChart"
          height="400px"
          data={[['Country', label], ...data]}
        />
      </Grid>
      <Grid xs={4}>
        <BarChartTable
          data={convertedData}
          totalConversation={totalConversation}
        />
      </Grid>
    </Grid>
  );
}

export default memo(GeoChart);