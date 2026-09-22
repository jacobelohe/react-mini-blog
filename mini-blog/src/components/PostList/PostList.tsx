import styled from 'styled-components';
import Post from '../Post/Post';
import withLogger from '../../hoc/withLogger';
import type { Post as PostType } from '../../types/post';

const SAMPLE_POSTS: PostType[] = [
  {
    id: 1,
    title: 'Getting Started with TypeScript in React',
    author: 'Admin',
    content:
      'TypeScript adds static typing to your React components, catching bugs before they ever reach the browser and making refactors far less scary.',
    datePosted: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Understanding the Vite Dev Server',
    author: 'Chidi Okafor',
    content:
      'Vite uses native ES modules during development, which means near-instant server start and lightning-fast hot module replacement compared to bundler-based tooling.',
    datePosted: '2026-09-15T09:00:00.000Z',
  },
  {
    id: 3,
    title: 'Five Tips for Cleaner React Components',
    author: 'Amara Diallo',
    content:
      'Keep components small, colocate state close to where it is used, extract reusable logic into hooks, and always give list items a stable key.',
    datePosted: '2026-08-30T09:00:00.000Z',
  },
];

const ListWrapper = styled.section`
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ListHeading = styled.h2`
  font-size: 1.25rem;
  color: #111827;
  margin-bottom: 1rem;
`;

function PostList() {
  return (
    <ListWrapper>
      <ListHeading>Latest Posts</ListHeading>
      {SAMPLE_POSTS.map((post) => (
        // Unique `key` per post lets React reuse DOM nodes and Post's
        // PureComponent bail-out instead of re-rendering the whole list.
        <Post key={post.id} post={post} />
      ))}
    </ListWrapper>
  );
}

export default withLogger(PostList);
