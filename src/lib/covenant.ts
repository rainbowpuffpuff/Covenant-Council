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
  utopia: string;
  dystopia: string;
};

export const principles: Principle[] = [
  {
    id: 1,
    shortTitle: 'Personhood',
    title: 'Universal Personhood: Your status as a person is neither issued nor revoked by any institution – it is inherent.',
    description: 'Every individual is able to prove their personhood, and the rights that come with it, without dependence on gate-keeping authorities. This is essential for self-determination, creative expression, and self-governance.',
    icon: UserCircle,
    imageId: 'principle-personhood',
    utopia: "This principle enables a world where human identity is liberated from all traditional gatekeepers. Your 'personhood' is inherent and self-evident, not something 'issued' by a government (like a passport) or 'revoked' by a corporation (like a banned account). This allows the 8 billion people on Earth, including refugees and the 1.1 billion without formal ID, to access a global economy, democratic processes, and digital services. It is the foundation for true self-determination, enabling creative expression and self-governance for everyone, everywhere.",
    dystopia: "If this principle is co-opted, 'Universal Personhood' becomes 'Universal Tracking.' A system built to verify every human can just as easily monitor every human. If a single, closed-source, or corporate-controlled entity (like the critiques of Worldcoin) becomes the de-facto 'personhood' provider, it becomes the most powerful gatekeeper in history. It could create a global, totalitarian system of control, linking your 'inherent' identity to your bank account, social media, and travel, with the power to 'revoke' your access to society for dissenting.",
  },
  {
    id: 2,
    shortTitle: 'Ownership',
    title: 'Inalienable Ownership: To own oneself is to own one’s keys, that are yours and yours only.',
    description: 'No authority grants this right; it is self-evident. Keys are recoverable, persistent, and secure against present and future threats to cryptography. With direct control of our cryptographic keys, every other digital right cannot be taken away.',
    icon: KeyRound,
    imageId: 'principle-ownership',
    utopia: "This principle is the technical foundation for absolute self-sovereignty. When you, and you alone, 'own your keys,' you own your assets, your data, and your digital self. No bank can freeze your account, no government can seize your property, and no platform can de-person you. This creates a world of persistent, recoverable, and secure digital rights, making every individual truly 'inalienable' from their digital life and property.",
    dystopia: "This principle risks creating a new, brutal digital divide. The technical reality of 'owning your keys' is unforgiving. While the human.tech CMO notes 'We don't believe everyone should do self-custody and write down their seed phrase', the alternative is often custodial solutions that re-introduce the very authorities you're trying to escape. This creates a two-tiered world: a small, technically-literate elite who are truly sovereign, and a vast majority who, in the name of convenience, are herded into 'user-friendly' systems that leave them just as vulnerable to control as before.",
  },
  {
    id: 3,
    shortTitle: 'Privacy',
    title: 'Privacy by Default: Encryption safeguards self-determination.',
    description: 'Personal data, identities, and information linked to our digital presence is not viewable by service providers or the public without our explicit consent. Our private data cannot be used to undermine our agency.',
    icon: Shield,
    imageId: 'principle-privacy',
    utopia: "This principle reclaims self-determination from the surveillance-for-profit model. In this vision, encryption is a human right. Your personal data is not viewable by any service provider or public entity without your 'explicit consent'. This ends the 'attention-harvesting' economy. Instead of data being used to 'undermine our agency' through manipulation, it remains yours. This fosters a world where you can explore, communicate, and exist digitally without fear of being watched, profiled, or sold.",
    dystopia: "Absolute privacy, when weaponized, becomes a shield for exploitation. As the Covenant's own Principle VIII (Voluntary Accountability) admits, privacy 'cannot be used to escape accountability.' A world of perfect, unbreakable, 'by default' encryption is a world where criminals, terrorists, and exploiters can operate with total impunity. It risks creating a digital 'dark forest' where law enforcement is blind and 'bad actors' can leverage perfect privacy to coordinate and execute the most heinous crimes, all safe behind their cryptographic wall.",
  },
  {
    id: 4,
    shortTitle: 'Information',
    title: 'Free flow of Information: Open source the collective imagination with open data networks.',
    description: 'The open exchange of art, science, code, and ideas is essential for human advancement. We affirm protocols, organizations, and creators that safely open source their content, code, documentation, and processes.',
    icon: BookOpen,
    imageId: 'principle-information',
    utopia: "This principle envisions a return to the original promise of the internet: a 'collective imagination' where the 'open exchange of art, science, code, and ideas' accelerates human advancement. By 'open-sourcing' content, code, and processes, we tear down information silos and paywalls. This leads to a Cambrian explosion of innovation, where a scientist in one country can build on the 'open data' of another, and artists can freely remix a 'collective' culture.",
    dystopia: "A 'free flow of information' with no friction is a poisoned well. This principle, in its absolute form, ensures that disinformation, propaganda, hate speech, and 'AI slop' flow just as freely as 'art and science.' This flooding of the information ecosystem—a 'Breakdown of Shared Understanding'—makes it impossible to distinguish truth from fiction. Instead of a 'collective imagination,' you get collective psychosis, where tribalism and conspiracy (which are often more 'viral' than truth) become the dominant forms of information.",
  },
  {
    id: 5,
    shortTitle: 'Capital',
    title: 'Free flow of Capital: Open source the collective imagination with open data networks.',
    description: 'The open exchange of art, science, code, and ideas is essential for human advancement. We affirm protocols, organizations, and creators that safely open source their content, code, documentation, and processes.',
    icon: ArrowRightLeft,
    imageId: 'principle-capital',
    utopia: "This principle (based on its title) imagines a truly global and permissionless economy. Capital can flow to where it's needed most, without the friction of borders or the censorship of 'gate-keeping authorities'. This empowers the unbanked, allowing them to participate in a 'free enterprise' system. It enables new forms of 'entrepreneurial dynamism' and allows anyone, anywhere, to fund the ideas and creators they believe in, instantly and directly.",
    dystopia: "A completely frictionless 'free flow of capital' is a primary tool for societal destabilization. This is the dream of the money launderer, the terrorist financier, and the ransomware syndicate. It allows 'neoliberal ideology' to 'consistently prioritise free flow of capital,' which critics argue is 'traumatising the entire planet'. Without regulation, it also leads to 'monopolistic interests' and extreme wealth concentration, creating a new class of techno-oligarchs who are above all law and accountable to no one.",
  },
  {
    id: 6,
    shortTitle: 'Public Goods',
    title: 'Capital Serves Public Goods: Public goods are the greatest basins for capital flow.',
    description: 'Incentives are designed to benefit open-source development, healthy communities of creative practice, scientific discovery, and overall the collective well-being of life on the planet.',
    icon: Recycle,
    imageId: 'principle-public-goods',
    utopia: "This principle is the utopian solution to the perils of Principle V. It envisions a 'regenerative economy' that realigns incentives toward the 'collective well-being.' In this world, it is more profitable to build and maintain 'open-source development,' 'healthy communities,' and 'scientific discovery' than it is to build an extractive, zero-sum business. It creates a positive-sum world where the 'greatest basins for capital flow' are those that heal the planet and enrich the community.",
    dystopia: "This principle could become a 'tyranny of the collective.' The core danger lies in a single question: Who decides what a 'public good' is? A system designed to 'incentivize' capital flow can easily be used to dis-incentivize it. If the collective (or the algorithm representing it) deems your art, your research, or your community 'not a public good,' you are starved of resources. This could create a suffocating monoculture, a 'social credit system' that suppresses niche, unpopular, or dissident ideas in the name of the 'collective well-Being.'",
  },
  {
    id: 7,
    shortTitle: 'Security',
    title: 'Universal Security: To act freely, one must be secure against key loss, surveillance, and intrusion.',
    description: 'Robust cryptography and AI-enhanced defenses belong in the hands of individuals. There is no true freedom without strong security. The human is best in control when awareness is heightened by robust systems that help make safe choices.',
    icon: LockKeyhole,
    imageId: 'principle-security',
    utopia: "This principle asserts that 'to act freely, one must be secure.' It envisions a world where 'robust cryptography and AI-enhanced defenses' are not the sole property of states and corporations but are 'in the hands of individuals'. This creates a digital environment where you are universally safe from 'key loss, surveillance, and intrusion.' It's a world where human 'awareness is heightened,' allowing you to navigate the digital world with confidence and 'true freedom.'",
    dystopia: "A 'universal' security standard is a universal target. This principle creates a dangerous technological arms race. The same 'AI-enhanced defenses' that protect individuals can be studied and broken by state-level attackers or other AIs. The peril is a 'brittle' system, not a resilient one. If a single flaw is found in the 'universal' architecture, everyone is compromised simultaneously. This monoculture of security is the opposite of resilience; it's a single point of failure that could lead to a catastrophic, system-wide collapse.",
  },
  {
    id: 8,
    shortTitle: 'Accountability',
    title: 'Voluntary Accountability: Consent fosters cooperation; accountability prevents exploitation.',
    description: 'Privacy and freedom are fundamental rights, but it cannot be used to escape accountability. Participants freely enter into social contracts, and abide by clear standards with consequences for violations. Privacy protects individuals from external coercion, while collective accountability prevents bad actors from weaponizing that privacy against others.',
    icon: Scale,
    imageId: 'principle-accountability',
    utopia: "This is the vision of mature, bottom-up digital governance. It's a world where 'consent fosters cooperation' and communities can create their own 'social contracts' without a top-down, coercive state. It wisely balances Principle III (Privacy) with the need to 'prevent exploitation,' allowing communities to set 'clear standards' and enforce 'consequences for violations' on their own terms, thereby preventing 'bad actors from weaponizing that privacy.'",
    dystopia: "As you noted, the peril of 'Voluntary Accountability' is the digital 'honor killing.' This principle, in the hands of 'intolerant cultures,' becomes a justification for digital vigilantism and mob justice. What happens when a community's 'social contract' defines dissent, different lifestyles, or 'blasphemy' as a 'violation'? This principle could be used to legitimize the digital witch hunt, the online mob, and community-enforced persecution, all under the 'benevolent' guise of a 'social contract' that participants 'freely enter' (or are coerced into).",
  },
  {
    id: 9,
    shortTitle: 'Earth',
    title: 'Earth Public Goods: The digital realm and physical world are intertwined.',
    description: "Technological progress that undermines the planet's ability to sustain diverse, flourishing life cannot be called progress.",
    icon: Globe,
    imageId: 'principle-earth',
    utopia: "This principle forces the digital world to be accountable to the physical one. It's a rejection of 'growth-at-any-cost nihilism' and the idea that 'progress' can happen in a vacuum. It forces innovators to count the true cost of their technology, including its energy use and environmental impact. This would usher in an era of sustainable, 'regenerative' protocols that must 'sustain diverse, flourishing life' on the planet to even be considered 'progress.'",
    dystopia: "This principle, when enforced, could become a new form of 'green' imperialism. Who gets to define 'undermining the planet'? Wealthy, post-industrial nations could use this principle to set environmental standards so high that they effectively 'gate-keep' innovation. They could brand the attempts of developing nations to build their own digital infrastructure (which may be less 'efficient') as 'not progress.' This creates a two-tiered system where 'sustainability' becomes a new tool to stifle competition and lock poorer nations out of the digital economy.",
  },
  {
    id: 10,
    shortTitle: 'Resilience',
    title: 'A Covenant of Adaptive Resilience: Networks must empower human agency, not collude with power.',
    description: 'A resilient network is as strong as the ties that bind it together. Any attempt to control or capture the network to break the principles in this covenant will push participants to more open, human-centric forks and leave would-be oppressors with little to gain.',
    icon: Network,
    imageId: 'principle-resilience',
    utopia: "This is the ultimate guarantee of freedom: the 'right to fork.' It's a promise that 'networks must empower human agency, not collude with power'. If any network or protocol becomes corrupt, centralized, or breaks the Covenant, the community isn't trapped. They can simply take the open-source code, 'fork' the network, and walk away, 'leave would-be oppressors with little to gain.' This makes the network 'adaptive' and 'resilient' by making capture or collusion economically pointless.",
    dystopia: "This is a recipe for permanent, unresolvable fragmentation. Rather than fostering resilient communities that learn to solve hard 'social contracts' (Principle VIII), this principle encourages 'schism' as the default solution to any disagreement. This 'fork-ability' can be exploited by bad actors to 'divide and conquer' a strong network. Instead of one resilient ecosystem, you get a thousand weak, low-liquidity, low-security 'human-centric forks,' each too small to be meaningful and all (ironically) more vulnerable to capture by the very 'oppressors' they sought to escape.",
  },
];
