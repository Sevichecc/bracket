import { Grid, Image, Title } from '@mantine/core';
import React from 'react';
import { SWRResponse } from 'swr';

import NotFoundTitle from '../../404';
import Brackets from '../../../components/brackets/brackets';
import { getTournamentIdFromRouter } from '../../../components/utils/util';
import { Tournament } from '../../../interfaces/tournament';
import { getBaseApiUrl, getRounds, getTournaments } from '../../../services/adapter';

export default function Dashboard() {
  const { tournamentData } = getTournamentIdFromRouter();
  const swrRoundsResponse: SWRResponse = getRounds(tournamentData.id, true);
  const swrTournamentsResponse = getTournaments();

  const tournaments: Tournament[] =
    swrTournamentsResponse.data != null ? swrTournamentsResponse.data.data : [];
  const tournamentDataFull = tournaments.filter(
    (tournament) => tournament.id === tournamentData.id
  )[0];

  if (tournamentDataFull == null) {
    return <NotFoundTitle />;
  }

  return (
    <Grid
      grow
      style={{ marginBottom: '20px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}
    >
      <Grid.Col span={3}>
        <Title>{tournamentDataFull.name}</Title>
        <Image radius="lg" src={`${getBaseApiUrl()}/static/${tournamentDataFull.logo_path}`} />
      </Grid.Col>
      <Grid.Col span={9}>
        <Brackets
          tournamentData={tournamentData}
          swrRoundsResponse={swrRoundsResponse}
          swrUpcomingMatchesResponse={null}
          readOnly
        />
      </Grid.Col>
    </Grid>
  );
}