import styled from '@emotion/styled';
import AudioPlayer from '@components/AudioPlayer';
import { breakpoint as bp } from '@src/lib/style';

export const StyledEpisode = styled.article`
  display: grid;
  gap: 40px;
  grid-template: minmax(350px, 100%) auto / auto;

  ${bp('medium')} {
    grid-template: auto / 200px auto;
    gap: 60px;
  }
`;

export const StyledList = styled.ul`
  display: grid;
  gap: 60px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25em;
`;

export const StyledSubtitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.grays.s500};
`;

export const StyledAudio: any = styled(AudioPlayer)`
  margin: 0;
  margin-top: auto;
`;

export const StyledContentWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CoverImgContainer: any = styled.div`
  ${bp('medium')} {
    perspective: 1000px;
    transform: scale(1.125);
  }
`;

export const CoverImg: any = styled.img`
  display: block;
  height: auto;
  width: auto;
  margin: 0 auto;
  ${bp('medium')} {
    width: 100%;
    transform: rotateY(30deg);
  }
`;
