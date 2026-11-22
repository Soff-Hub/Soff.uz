import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import AgentDetail from '~/widgets/agent-detail';
import { AI_AGENTS, agentImage, getAgent } from '~/entities/ai-agent/model';

// /agents/[id], not /agent/[id]: everything under /agent is the SoffX app itself (next.config.js).
export default function AgentPage({ id }) {
    const agent = getAgent(id);

    return (
        <PageLayout>
            <Meta
                title={`${agent.name} — AI agent | SoffX · Soff.uz`}
                description={`${agent.role}. ${agent.about}`}
                image={`https://soff.uz${agentImage(agent.id, 'full')}`}
                keywords={[
                    { name: `AI ${agent.name.toLowerCase()}` },
                    { name: 'AI agent' },
                    { name: 'SoffX' },
                    ...agent.skills.map((name) => ({ name })),
                ]}
            />
            <AgentDetail agent={agent} />
        </PageLayout>
    );
}

export async function getStaticPaths() {
    return {
        paths: AI_AGENTS.map((agent) => ({ params: { id: agent.id } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    return { props: { id: params.id } };
}
