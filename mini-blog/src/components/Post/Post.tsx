import { PureComponent } from 'react';
import type { Post as PostType } from '../../types/post';

interface PostProps {
  post: PostType;
}

const HIGHLIGHTED_AUTHOR = 'Admin';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getPreview(content: string, wordCount = 12): string {
  const words = content.trim().split(/\s+/);
  if (words.length <= wordCount) return content;
  return `${words.slice(0, wordCount).join(' ')}...`;
}

function isNew(datePosted: string): boolean {
  const posted = new Date(datePosted).getTime();
  return Date.now() - posted <= ONE_DAY_MS;
}

/**
 * Post is implemented as a class component (rather than functional) to
 * demonstrate class-based component syntax and lifecycle-aware
 * optimization via React.PureComponent, which shallow-compares props and
 * skips re-rendering when the `post` prop hasn't changed. See the README
 * "Component Types" section for the full justification.
 */
class Post extends PureComponent<PostProps> {
  render() {
    const { post } = this.props;
    const isHighlighted = post.author === HIGHLIGHTED_AUTHOR;

    // Inline styles used for conditional styling based on post data.
    const cardStyle: React.CSSProperties = {
      backgroundColor: isHighlighted ? '#fef3c7' : '#ffffff',
      border: isHighlighted ? '1px solid #f59e0b' : '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.25rem',
      marginBottom: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    };

    return (
      <article style={cardStyle}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>{post.title}</h3>
          {isNew(post.datePosted) && (
            <span
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
              }}
            >
              New!
            </span>
          )}
        </header>
        <p style={{ margin: '0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}>
          By {post.author} &middot; {new Date(post.datePosted).toLocaleDateString()}
        </p>
        <p style={{ margin: 0 }}>{getPreview(post.content)}</p>
      </article>
    );
  }
}

export default Post;
