import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Pin,
  Share2,
  Shield,
  ThumbsUp,
} from 'lucide-react';
import {
  INITIAL_POSTS,
  PROFILE,
  PROJECTS,
  SKILLS,
  type ProfilePost,
} from '../data/portfolioData';
import type { ProfileTab } from './FacebookHeader';

interface PostsFeedProps {
  onSelectTab: (tab: ProfileTab) => void;
  onOpenContact: () => void;
}

export function PostsFeed({ onSelectTab, onOpenContact }: PostsFeedProps) {
  const [posts, setPosts] = useState<ProfilePost[]>(INITIAL_POSTS);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    'post-routine-app': true,
  });
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [sharedPostId, setSharedPostId] = useState<string | null>(null);

  // Wall composer state
  const [wallAuthor, setWallAuthor] = useState('');
  const [wallText, setWallText] = useState('');
  const [composerExpanded, setComposerExpanded] = useState(false);

  const toggleLike = (postId: string) => {
    setLikedIds((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleComments = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: string, event: React.FormEvent) => {
    event.preventDefault();
    const draft = (commentDrafts[postId] || '').trim();
    if (!draft) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              initialComments: [
                ...post.initialComments,
                {
                  id: `c-${Date.now()}`,
                  author: 'Visitor',
                  text: draft,
                  time: 'Just now',
                },
              ],
            }
          : post
      )
    );
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
    setOpenComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleShare = async (postId: string) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard blocked fallback
    }
    setSharedPostId(postId);
    setTimeout(() => {
      setSharedPostId((prev) => (prev === postId ? null : prev));
    }, 2000);
  };

  const handleWallPost = (event: React.FormEvent) => {
    event.preventDefault();
    if (!wallText.trim()) return;

    const newPost: ProfilePost = {
      id: `wall-${Date.now()}`,
      timestamp: 'Just now',
      category: `Note from ${wallAuthor.trim() || 'Guest'}`,
      title: `Message on ${PROFILE.name}'s Profile`,
      body: wallText.trim(),
      initialLikes: 1,
      initialComments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setWallAuthor('');
    setWallText('');
    setComposerExpanded(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Sidebar (Classic Facebook Intro & Skills) */}
      <aside className="lg:col-span-5 space-y-5">
        {/* Intro Card */}
        <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-5">
          <h2 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
            Intro
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#4B4F56] dark:text-[#B0B3B8] text-center pb-4 border-b border-[#E4E6EB] dark:border-[#3E4042]">
            {PROFILE.headlineBio}
          </p>

          <ul className="mt-4 space-y-3 text-sm text-[#1C1E21] dark:text-[#E4E6EB]">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <span>
                Studies <span className="font-semibold">{PROFILE.department}</span> (
                {PROFILE.batch}) at <span className="font-semibold">{PROFILE.institute}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Code2 className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <span>
                Builds applications including the{' '}
                <button
                  type="button"
                  onClick={() => onSelectTab('projects')}
                  className="font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline"
                >
                  Batch 38 Class Routine App
                </button>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <span>
                Primary interest in <span className="font-semibold">{PROFILE.interest}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline break-all"
              >
                {PROFILE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <a
                href={`tel:${PROFILE.phone}`}
                className="font-mono tabular-nums hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline"
              >
                {PROFILE.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Linkedin className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline break-all"
              >
                {PROFILE.linkedinLabel}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Github className="w-4 h-4 text-[#65676B] dark:text-[#B0B3B8] mt-0.5 shrink-0" />
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877F2] dark:hover:text-[#2D88FF] hover:underline break-all"
              >
                {PROFILE.githubLabel}
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => onSelectTab('about')}
            className="mt-5 w-full py-2 text-sm font-semibold text-[#1C1E21] dark:text-[#E4E6EB] bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-lg transition-colors"
          >
            View Full About
          </button>
        </div>

        {/* Skills Summary Card */}
        <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
              Skills
            </h2>
            <button
              type="button"
              onClick={() => onSelectTab('skills')}
              className="text-xs font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="mt-3 divide-y divide-[#E4E6EB] dark:divide-[#3E4042]">
            {SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="py-2.5 flex items-center justify-between gap-3 text-sm"
              >
                <span className="font-medium text-[#1C1E21] dark:text-[#E4E6EB]">
                  {skill.name}
                </span>
                <span className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                  {skill.categoryLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Feed Column */}
      <div className="lg:col-span-7 space-y-5">
        {/* Facebook-style Composer Card */}
        <div className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <img
              src={PROFILE.photoUrl}
              alt={PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover object-top border border-[#DCE0E5] dark:border-[#3E4042] shrink-0"
            />
            <button
              type="button"
              onClick={() => setComposerExpanded((prev) => !prev)}
              className="flex-1 text-left px-4 py-2.5 text-sm text-[#65676B] dark:text-[#B0B3B8] bg-[#F0F2F5] hover:bg-[#E4E6EB] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-full transition-colors"
            >
              Leave a note on {PROFILE.name}&apos;s profile...
            </button>
          </div>

          {composerExpanded ? (
            <form
              onSubmit={handleWallPost}
              className="mt-4 pt-3 border-t border-[#E4E6EB] dark:border-[#3E4042] space-y-3"
            >
              <input
                type="text"
                value={wallAuthor}
                onChange={(e) => setWallAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-lg text-[#1C1E21] dark:text-[#E4E6EB] placeholder:text-[#8A8D91] focus:outline-none focus:border-[#1877F2] dark:focus:border-[#2D88FF]"
              />
              <textarea
                rows={3}
                required
                value={wallText}
                onChange={(e) => setWallText(e.target.value)}
                placeholder="Write a message, feedback on the Batch 38 routine app, or cyber security note..."
                className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-lg text-[#1C1E21] dark:text-[#E4E6EB] placeholder:text-[#8A8D91] focus:outline-none focus:border-[#1877F2] dark:focus:border-[#2D88FF] resize-y"
              />
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-xs font-semibold text-[#1877F2] dark:text-[#2D88FF] hover:underline"
                >
                  Send private email instead
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setComposerExpanded(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F0F2F5] dark:hover:bg-[#3A3B3C] rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg transition-colors"
                  >
                    Post Note
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mt-3 pt-3 border-t border-[#E4E6EB] dark:border-[#3E4042] grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSelectTab('projects')}
                className="py-2 text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('skills')}
                className="py-2 text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
              >
                Skills &amp; Security
              </button>
              <button
                type="button"
                onClick={onOpenContact}
                className="py-2 text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
              >
                Direct Message
              </button>
            </div>
          )}
        </div>

        {/* Feed Posts Stream */}
        {posts.map((post) => {
          const isLiked = !!likedIds[post.id];
          const likeCount = post.initialLikes + (isLiked ? 1 : 0);
          const commentsVisible = !!openComments[post.id];

          return (
            <article
              key={post.id}
              className="bg-white dark:bg-[#242526] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl p-4 sm:p-5"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={PROFILE.photoUrl}
                    alt={PROFILE.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover object-top border border-[#DCE0E5] dark:border-[#3E4042] shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1E21] dark:text-[#E4E6EB]">
                      {PROFILE.name}
                    </p>
                    <p className="text-xs text-[#65676B] dark:text-[#B0B3B8]">
                      {post.timestamp} · {post.category}
                    </p>
                  </div>
                </div>

                {post.pinned && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1877F2] dark:text-[#2D88FF]">
                    <Pin className="w-3.5 h-3.5" />
                    <span>Pinned</span>
                  </span>
                )}
              </div>

              {/* Post Copy */}
              <div className="mt-3.5">
                <h3 className="font-display text-lg font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3A3B3C] dark:text-[#B0B3B8]">
                  {post.body}
                </p>
              </div>

              {/* Project Details Attachment Card (No live demo) */}
              {post.hasProjectLink && PROJECTS[0] && (
                <div className="mt-4 p-4 sm:p-5 bg-[#F8F9FA] dark:bg-[#18191A] border border-[#DCE0E5] dark:border-[#3E4042] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#65676B] dark:text-[#B0B3B8] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#1877F2] dark:text-[#2D88FF]" />
                      <span>{PROJECTS[0].audience}</span>
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-[#1C1E21] dark:text-[#E4E6EB]">
                      {PROJECTS[0].title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#4B4F56] dark:text-[#B0B3B8]">
                      {PROJECTS[0].subtitle} · {PROJECTS[0].technologies.join(' · ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTab('projects')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Engagement Metrics Bar */}
              <div className="mt-4 pt-2.5 flex items-center justify-between text-xs text-[#65676B] dark:text-[#B0B3B8] border-t border-[#E4E6EB] dark:border-[#3E4042]">
                <span className="tabular-nums">
                  {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleComments(post.id)}
                  className="hover:underline tabular-nums"
                >
                  {post.initialComments.length}{' '}
                  {post.initialComments.length === 1 ? 'Comment' : 'Comments'}
                </button>
              </div>

              {/* Action Buttons Bar */}
              <div className="mt-2 pt-1.5 border-t border-[#E4E6EB] dark:border-[#3E4042] grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className={`py-2 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                    isLiked
                      ? 'text-[#1877F2] bg-[#E7F3FF] dark:text-[#2D88FF] dark:bg-[#2D88FF]/15'
                      : 'text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleComments(post.id)}
                  className="py-2 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Comment</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShare(post.id)}
                  className="py-2 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{sharedPostId === post.id ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              {/* Expandable Comment Thread */}
              {commentsVisible && (
                <div className="mt-3 pt-3 border-t border-[#E4E6EB] dark:border-[#3E4042] space-y-3">
                  {post.initialComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-xl px-3.5 py-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#1C1E21] dark:text-[#E4E6EB]">
                          {comment.author}
                        </p>
                        <span className="text-[11px] text-[#65676B] dark:text-[#B0B3B8]">
                          {comment.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-[#1C1E21] dark:text-[#E4E6EB]">
                        {comment.text}
                      </p>
                    </div>
                  ))}

                  <form
                    onSubmit={(event) => handleAddComment(post.id, event)}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={commentDrafts[post.id] || ''}
                      onChange={(e) =>
                        setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      placeholder="Write a comment..."
                      aria-label={`Comment on ${post.title}`}
                      className="flex-1 px-3.5 py-2 text-xs bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-[#1877F2] dark:focus:border-[#2D88FF] focus:bg-white dark:focus:bg-[#18191A] rounded-full text-[#1C1E21] dark:text-[#E4E6EB] placeholder:text-[#65676B] dark:placeholder:text-[#B0B3B8] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#166FE5] dark:bg-[#2D88FF] dark:hover:bg-[#3B93FF] rounded-full transition-colors shrink-0"
                    >
                      Post
                    </button>
                  </form>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
