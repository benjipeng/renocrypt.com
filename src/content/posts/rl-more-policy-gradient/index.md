---
title: "Trust Region Policy Optimization, Proximal Policy Optimization"
description: "Off-policy algorithms uses past experiences, while Proximal Policy Optimization (PPO) and Trust Region Policy Optimization (TRPO) offer advanced strategies for stable policy evolution in reinforcement learning."
date: 2024-08-20
series: ["Reinforcement Learning and Deep Reinforcement Learning"]
series_order: 2
showAuthor: false
showTableOfContents: true
showHero: true
heroStyle: background
cover: "./featured.jpg"
---
Policy Gradient is a method in reinforcement learning where the policy is directly optimized by estimating the gradient of the expected reward concerning the policy *parameters*.

A neuron network with parameter $\theta$ can be used to describe policy $\pi_{\theta}$.

- **Input**: the observation of machine represented as a vector or a matrix.
- **Output**: each action corresponds to a neuron in output layer.

From the previous article, **Trajectory** $\tau = \lbrace s_1, a_1, s_2, a_2, ..., s_T, a_T \rbrace$. For every trajectory, its probability can be calculated ( given the parameters $\theta$ of the `actor` ):

Off-policy algorithms open doors to learning from past experiences, while Proximal Policy Optimization (PPO) and Trust Region Policy Optimization (TRPO) ensures stable policy updates.

**On-policy v.s. Off-policy**:

- On-policy: The `agent` ( or `actor`) learned and the `actor` interacting with the `environment` are the *same*.
- Off-policy: The `actor` learned and the `actor` interacting with the `environment` are *different*.

## Vanilla Policy Gradient (VPG) algorithm

<div class="reno-typeit">
VPG focuses on improving a policy by adjusting the probabilities of actions based on their expected returns
</div>

The key idea of `Vanilla Policy Gradient` is to increase the likelihood of actions that lead to high rewards and decrease the likelihood of actions that lead to low rewards.

Let $\pi_\theta$​ be a policy with parameters 𝜃, and let $J(\pi_{\theta})$ represent the expected finite-horizon un-discounted return of the policy. The gradient of $J(\pi_{\theta})$ with respect to the policy parameters 𝜃 is given by:

$$
\nabla_{\theta} J(\pi_{\theta}) = \mathbb{E}_{\tau \sim \pi_{\theta}} \left[
\sum_{t=0}^{T} \nabla_{\theta} \log \pi_{\theta}(a_t | s_t) A^{\pi_{\theta}}(s_t, a_t)
\right]
$$

where $A^{\pi_{\theta}}(s_t, a_t)$ is the advantage function representing the relative value of an action $a_t$ ​ taken in state $s_t$  under the current policy $\pi_{\theta}$.

The `VPG` algorithm optimizes the policy by performing stochastic gradient ascent on the policy performance:

$$\theta_{k+1} = \theta_k + \alpha \nabla_{\theta} J(\pi_{\theta_k})$$

$\alpha$ is the learning rate, and $\nabla_{\theta} J(\pi_{\theta_k})$ is the estimated policy gradient.

- **Exploration**: VPG maintains a stochastic policy, meaning actions are sampled based on probabilities. This allows the agent to explore different actions.
- **Exploitation**: Over time, as the policy improves, the randomness in action selection decreases, leading the policy to exploit known rewards. However, this can sometimes cause the policy to get stuck in local optima.

## Trust Region Policy Optimization

`Trust Region Policy Optimization` (TRPO) is an advanced algorithm designed to improve policy performance while maintaining *stability* during training. Unlike vanilla policy gradients, which can be unstable with large steps, TRPO introduces a mechanism to ensure that each update step stays within a "trust region".

The *trust region* is defined by a constraint on how much the new policy is allowed to differ from the old one, measured using KL-Divergence --- a metric that quantifies the difference between two probability distributions.

### Kullback–Leibler (KL) divergence

Kullback–Leibler (KL) divergence, ${\displaystyle D_{\text{KL}}(P\parallel Q)}$, measures how one probability distribution $P$ is different from a second, reference probability distribution $Q$.

$${\displaystyle D_{\text{KL}}(P\parallel Q)=\sum _{x\in {\mathcal {X}}}P(x)\ \log \left({\frac {\ P(x)\ }{Q(x)}}\right).}$$

### The TRPO Update Rule

Use $\pi_\theta$​ to represent a policy with parameters 𝜃. The goal of TRPO is to maximize the policy performance while ensuring that the new policy $\pi_{\theta+1}$​  is close to the old policy ​$\pi_{\theta}$. The theoretical update rule is ($s.t.$ means $\mathit{such} \ \mathit{that}$):

$$
\begin{aligned}
\theta_{k+1} &= \arg\max_{\theta} \mathcal{L}(\theta_k, \theta) \\
\text{s.t.}\quad \bar{D}_{KL}(\theta \Vert \theta_k) &\leq \delta
\end{aligned}
$$

- $\mathcal{L}(\theta_k, \theta)$ is the `Surrogate Advantage Function`, measuring how well the new policy $\pi_\theta$ performs relative to the old policy $\pi_{\theta_k}$

  $$
  \mathcal{L}(\theta_k, \theta) = \mathbb{E}_{s,a \sim \pi_{\theta_k}} \left[
  \frac{\pi_{\theta}(a|s)}{\pi_{\theta_k}(a|s)} A^{\pi_{\theta_k}}(s,a)
  \right]
  $$
- **KL-Divergence Constraint**, $\bar{D}_{KL}(\theta \Vert \theta_k)$,ensures the new policy doesn’t diverge too much from the old policy.

  $$
  \bar{D}_{KL}(\theta \Vert \theta_k) = \mathbb{E}_{s \sim \pi_{\theta_k}} \lbrack D_{KL}\lparen\pi_{\theta}(\cdot|s) \Vert \pi_{\theta_k} (\cdot|s) \rparen \rbrack
  $$

### Approximations for Practical Implementation

The theoretical TRPO update is complex, so approximations are used:

**Taylor Expansion**: $\mathcal{L}(\theta_k, \theta)$ and $\bar{D}_{KL}(\theta \Vert \theta_k)$ can both be appriximated using tylor expansion around $\theta_k$

- Surrogate advantage:
  $$\mathcal{L}(\theta_k, \theta) \approx g^T (\theta - \theta_k)$$
- KL-Divergence:
  $$\bar{D}_{KL}(\theta \Vert \theta_k) \approx \frac{1}{2} (\theta - \theta_k)^T H (\theta - \theta_k)$$

Resulting in an approximate optimization problem:

$$
\begin{aligned}
\theta_{k+1} &= \arg\max_{\theta} g^T (\theta - \theta_k) \\
\text{s.t.}\quad \frac{1}{2}(\theta - \theta_k)^T H(\theta - \theta_k) &\leq \delta
\end{aligned}
$$

**Lagrangian Duality Solution**: This optimization problem can be solved using Lagrangian duality, resulting in:

$$\theta_{k+1} = \theta_k + \sqrt{\frac{2 \delta}{g^T H^{-1} g}} H^{-1} g$$

**Backtracking Line Search**: Due to potential errors from approximations, TRPO employs a backtracking line search to ensure the new policy satisfies the KL-Divergence constraint and improves performance:

$$\theta_{k+1} = \theta_k + \alpha^j \sqrt{\frac{2 \delta}{g^T H^{-1} g}} H^{-1} g$$

## Proximal Policy Optimization

PPO, or Proximal Policy Optimization, addresses a similar challenge as TRPO: how to make the largest possible policy improvement using existing data without risking a collapse in performance.

TRPO uses a complex second-order optimization approach, while PPO simplifies this by using first-order methods with additional mechanisms to ensure the new policy remains close to the old one. Despite its simplicity, PPO often matches or exceeds the performance of TRPO.

PPO comes in two main flavors: PPO-Penalty and PPO-Clip. Both aim to limit the change between consecutive policies, but they achieve this in different ways:

- **PPO-Penalty**: Introduces a penalty for deviating too far from the old policy in terms of KL-divergence. The penalty coefficient is adjusted automatically during training to ensure it's appropriate.

- **PPO-Clip**: Instead of using a KL-divergence penalty or constraint, it clips the objective function itself to prevent the new policy from diverging too much from the old policy.
