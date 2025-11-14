import {
  UserCircle,
  KeyRound,
  Shield,
  BookOpen,
  ArrowRightLeft,
  Recycle,
  LockKeyhole,
  Scale,
  Globe,
  Network,
  type LucideIcon,
} from 'lucide-react';

export type Principle = {
  id: number;
  shortTitle: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageId?: string;
};

export const principles: Principle[] = [
  {
    id: 1,
    shortTitle: 'Personhood',
    title: 'Universal Personhood: Your status as a person is neither issued nor revoked by any institution – it is inherent.',
    description: 'Every individual is able to prove their personhood, and the rights that come with it, without dependence on gate-keeping authorities. This is essential for self-determination, creative expression, and self-governance.',
    icon: UserCircle,
    imageId: 'principle-personhood',
  },
  {
    id: 2,
    shortTitle: 'Ownership',
    title: 'Inalienable Ownership: To own oneself is to own one’s keys, that are yours and yours only.',
    description: 'No authority grants this right; it is self-evident. Keys are recoverable, persistent, and secure against present and future threats to cryptography. With direct control of our cryptographic keys, every other digital right cannot be taken away.',
    icon: KeyRound,
    imageId: 'principle-ownership',
  },
  {
    id: 3,
    shortTitle: 'Privacy',
    title: 'Privacy by Default: Encryption safeguards self-determination.',
    description: 'Personal data, identities, and information linked to our digital presence is not viewable by service providers or the public without our explicit consent. Our private data cannot be used to undermine our agency.',
    icon: Shield,
    imageId: 'principle-privacy',
  },
  {
    id: 4,
    shortTitle: 'Information',
    title: 'Free flow of Information: Open source the collective imagination with open data networks.',
    description: 'The open exchange of art, science, code, and ideas is essential for human advancement. We affirm protocols, organizations, and creators that safely open source their content, code, documentation, and processes.',
    icon: BookOpen,
    imageId: 'principle-information',
  },
  {
    id: 5,
    shortTitle: 'Capital',
    title: 'Free flow of Capital: Open source the collective imagination with open data networks.',
    description: 'The open exchange of art, science, code, and ideas is essential for human advancement. We affirm protocols, organizations, and creators that safely open source their content, code, documentation, and processes.',
    icon: ArrowRightLeft,
    imageId: 'principle-capital',
  },
  {
    id: 6,
    shortTitle: 'Public Goods',
    title: 'Capital Serves Public Goods: Public goods are the greatest basins for capital flow.',
    description: 'Incentives are designed to benefit open-source development, healthy communities of creative practice, scientific discovery, and overall the collective well-being of life on the planet.',
    icon: Recycle,
    imageId: 'principle-public-goods',
  },
  {
    id: 7,
    shortTitle: 'Security',
    title: 'Universal Security: To act freely, one must be secure against key loss, surveillance, and intrusion.',
    description: 'Robust cryptography and AI-enhanced defenses belong in the hands of individuals. There is no true freedom without strong security. The human is best in control when awareness is heightened by robust systems that help make safe choices.',
    icon: LockKeyhole,
    imageId: 'principle-security',
  },
  {
    id: 8,
    shortTitle: 'Accountability',
    title: 'Voluntary Accountability: Consent fosters cooperation; accountability prevents exploitation.',
    description: 'Privacy and freedom are fundamental rights, but it cannot be used to escape accountability. Participants freely enter into social contracts, and abide by clear standards with consequences for violations. Privacy protects individuals from external coercion, while collective accountability prevents bad actors from weaponizing that privacy against others.',
    icon: Scale,
    imageId: 'principle-accountability',
  },
  {
    id: 9,
    shortTitle: 'Earth',
    title: 'Earth Public Goods: The digital realm and physical world are intertwined.',
    description: 'Technological progress that undermines the planet\'s ability to sustain diverse, flourishing life cannot be called progress.',
    icon: Globe,
    imageId: 'principle-earth',
  },
  {
    id: 10,
    shortTitle: 'Resilience',
    title: 'A Covenant of Adaptive Resilience: Networks must empower human agency, not collude with power.',
    description: 'A resilient network is as strong as the ties that bind it together. Any attempt to control or capture the network to break the principles in this covenant will push participants to more open, human-centric forks and leave would-be oppressors with little to gain.',
    icon: Network,
    imageId: 'principle-resilience',
  },
];
