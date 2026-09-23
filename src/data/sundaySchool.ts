/**
 * The 26 lessons in Life Lessons & A Life of Service, One Fold Publishing (2026).
 * The booklet is undated. Per the Nigeria second-half schedule, Lesson One is
 * assigned to Sunday 5 July 2026 and subsequent lessons follow weekly.
 * Only lesson titles and a short KJV key verse are displayed; the booklet is
 * not hosted or reproduced here.
 */
const lessons = [
  { title: "Asa’s Zeal for the Law", reference: '1 Kings 15:11', verse: 'And Asa did that which was right in the eyes of the LORD, as did David his father.' },
  { title: 'The Consequence of Compromise', reference: '2 Chronicles 16:12', verse: 'And Asa in the thirty and ninth year of his reign was diseased in his feet, until his disease was exceeding great: yet in his disease he sought not to the LORD, but to the physicians.' },
  { title: "Jehoshaphat’s Humility and Faithfulness", reference: '2 Chronicles 17:3', verse: 'And the LORD was with Jehoshaphat, because he walked in the first ways of his father David, and sought not unto Baalim;' },
  { title: "God’s Sustaining Power Throughout Elijah’s Journey", reference: '1 Kings 17:1', verse: 'And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word.' },
  { title: "Elijah’s Obedience and Unwavering Faith", reference: '1 Kings 18:39', verse: 'And when all the people saw it, they fell on their faces: and they said, The LORD, he is the God; the LORD, he is the God.' },
  { title: 'Perseverance in Discouraging Times', reference: '1 Kings 19:4', verse: "But he himself went a day’s journey into the wilderness, and came and sat down under a juniper tree: and he requested for himself that he might die; and said, It is enough; now, O LORD, take away my life; for I am not better than my fathers." },
  { title: 'Elisha Takes up the Mantle', reference: '2 Kings 2:14', verse: 'And he took the mantle of Elijah that fell from him, and smote the waters, and said, Where is the LORD God of Elijah? and when he also had smitten the waters, they parted hither and thither: and Elisha went over.' },
  { title: "Elisha’s Bold Stand", reference: '2 Kings 2:14', verse: 'And he took the mantle of Elijah that fell from him, and smote the waters, and said, Where is the LORD God of Elijah? and when he also had smitten the waters, they parted hither and thither: and Elisha went over.' },
  { title: 'Start Strong, Finish Well', reference: 'Matthew 10:22', verse: "And ye shall be hated of all men for my name’s sake: but he that endureth to the end shall be saved." },
  { title: 'A Critical Mistake', reference: '2 Kings 18:3', verse: 'And he did that which was right in the sight of the LORD, according to all that David his father did.' },
  { title: 'Consequences Despite Repentance', reference: 'Jeremiah 15:4', verse: 'And I will cause them to be removed into all kingdoms of the earth, because of Manasseh the son of Hezekiah king of Judah, for that which he did in Jerusalem.' },
  { title: "Josiah Rediscovers God’s Word", reference: '2 Chronicles 34:2', verse: 'And he did that which was right in the sight of the LORD, and walked in the ways of David his father, and declined neither to the right hand, nor to the left.' },
  { title: 'Widespread and Lasting Influence', reference: '2 Kings 23:25', verse: 'And like unto him was there no king before him, that turned to the LORD with all his heart, and with all his soul, and with all his might, according to all the law of Moses; neither after him arose there any like him.' },
  { title: 'Service Requires Action', reference: 'Nehemiah 4:6', verse: 'So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.' },
  { title: 'Evangelism Requires Personal Contact', reference: 'Luke 14:23', verse: 'And the lord said unto the servant, Go out into the highways and hedges, and compel them to come in, that my house may be filled.' },
  { title: 'Phebe: A Faithful Mail Carrier', reference: 'Romans 16:1', verse: 'I commend unto you Phebe our sister, which is a servant of the church which is at Cenchrea:' },
  { title: 'The Power of a Letter', reference: '1 Timothy 3:15', verse: 'But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.' },
  { title: 'Something Beautiful', reference: 'Isaiah 61:3', verse: 'To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the LORD, that he might be glorified.' },
  { title: 'For Such a Time as This', reference: 'Esther 4:14', verse: "For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father’s house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?" },
  { title: 'Finishing the Work', reference: 'John 4:34', verse: 'Jesus saith unto them, My meat is to do the will of him that sent me, and to finish his work.' },
  { title: 'Daily Devotion and Prayer', reference: 'Joshua 1:8', verse: 'This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.' },
  { title: 'A Life of Service Will Come with a Cost', reference: '2 Timothy 3:12', verse: 'Yea, and all that will live godly in Christ Jesus shall suffer persecution.' },
  { title: 'Jesus, Our Suffering Saviour', reference: 'Philippians 2:7', verse: 'But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men:' },
  { title: 'A Life of Service Requires a Heart of Forgiveness', reference: 'Matthew 18:22', verse: 'Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven.' },
  { title: 'The Light of the World', reference: 'Psalm 8:1', verse: 'O LORD our Lord, how excellent is thy name in all the earth! who hast set thy glory above the heavens.' },
  { title: 'Being Thankful for Forgiveness', reference: 'Isaiah 55:7', verse: 'Let the wicked forsake his way, and the unrighteous man his thoughts: and let him return unto the LORD, and he will have mercy upon him; and to our God, for he will abundantly pardon.' },
] as const;

export const SUNDAY_SCHOOL_FIRST_DATE = '2026-07-05';
export const SUNDAY_SCHOOL_LAST_DATE = '2026-12-27';
const firstDayUtc = Date.UTC(2026, 6, 5);
const millisecondsPerDay = 86_400_000;

export function nigeriaDateKey(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (part: string) => parts.find(({ type }) => type === part)?.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function getSundaySchoolLesson(now: Date = new Date()) {
  const date = nigeriaDateKey(now);
  const [year, month, day] = date.split('-').map(Number);
  const elapsedDays = (Date.UTC(year, month - 1, day) - firstDayUtc) / millisecondsPerDay;
  const index = elapsedDays / 7;
  if (!Number.isInteger(index) || index < 0 || index >= lessons.length) return null;
  return { ...lessons[index], number: index + 1, date };
}
