---
title: "An in-Depth Look at Leading Computer Vision ML Models"
description: "Discover top computer vision algorithms and techniques in machine learning, with thorough explanations and ongoing updates."
date: 2024-07-20
# series: ["Image Generation"]
# series_order: 1
showAuthor: false
showTableOfContents: true
showHero: true
heroStyle: background
categories: "machine-learning-theory"
tags: ["computer-vision", "machine-learning", "machine-learning-models"]
url: "an-in-depth-look-at-leading-computer-vision-models"
cover: "./featured.jpg"
---


# An in-Depth Look at Leading Computer Vision ML Models

As computer vision continues to evolve, understanding the various machine learning models driving this technology is crucial. We explore the most impactful models, highlighting key innovations.

## Convolutional Neural Networks (CNN)-based

CNN are used to extract features from images (and videos), employing convolutions as their primary operator.

<figure class="reno-figure">
  <img src="https://www.pinecone.io/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fvr8gru94%2Fproduction%2F7d76c907c2df91eb7dc5111cc7c27caae7bad1c1-901x440.png&w=3840&q=75" alt="Typical architecture of a CNN" />
  <figcaption>A typical architecture of a CNN, credit to [pinecone.io](https://www.pinecone.io/learn/series/image-search/imagenet/)</figcaption>
</figure>

### AlexNet

Designed by Alex Krizhevsky in collaboration with Ilya Sutskever and Geoffrey Hinton (_University of Toronto_), AlexNet ([ImageNet Classification with Deep Convolutional Neural Networks](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html), NIPS 2012) marks a breakthrough in deep learning.

<figure class="reno-figure">
  <img src="https://www.pinecone.io/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fvr8gru94%2Fproduction%2F511d51bd1d1ec3b7155250bf7e53cfa6cb52f215-1339x503.png&w=3840&q=75" alt="Network architecture of AlexNet" />
  <figcaption>Network architecture of AlexNet, credit to [pinecone.io](https://www.pinecone.io/learn/series/image-search/imagenet/)</figcaption>
</figure>

AlexNet model consisted of 8 layers: 5 conv layers followed by 3 fully-connected (FC) linear layers (Rectified Linear Unit `ReLU` as activation functions). A 1000-node softmax was used to produce the 1000-label classification (a _probability distribution_ over the 1000 classes) for ImageNet.

### GoogLeNet

GoogLeNet, aka Inception-v1, was for ILSVRC 2014 and CVPR 2015 [Going deeper with convolutions](https://ar5iv.labs.arxiv.org/html/1409.4842v1) based on the Inception architecture. An `Inception Module` is an image model block approximates an _optimal_ local sparse structure in a CNN, allowing the network to extract features at **multiple scales simultaneously**.

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x3.png" class="grid-w40" />
<img src="https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x4.png" class="grid-w40" />
<img src="https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x5.png" class="grid-w10" />
</div>

GoogLeNet has _parallel convolution layers_ of different kernel sizes (`1x1`, `3x3`, `5x5`) as well as _a max pooling_ layer, with the outputs _concatenated_ before being passed to the next layer. The full GoogLeNet architecture consists of 22 layers deep.

#### GoogLENet v2

Or Inception-v2, comes from [Rethinking the Inception Architecture for Computer Vision](https://ar5iv.labs.arxiv.org/html/1512.00567).

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/1512.00567/assets/x1.png" class="grid-w40" />
<img src="https://ar5iv.labs.arxiv.org/html/1512.00567/assets/x3.png" class="grid-w40" />

<!-- <img src="https://ar5iv.labs.arxiv.org/html/1409.4842/assets/x5.png" class="grid-w10" /> -->

</div>

- Mini-network (3 x 3) replacing the 5 × 5 convolutions, should be around 28% reduction in calculation `(5x5 - 3x3 - 3x3)/ 5x5` (more about convolution, see [Simple Convolution Operation](https://calvinfeng.gitbook.io/machine-learning-notebook/supervised-learning/convolutional-neural-network/convolution_operation)).
- Authors also found an `nxn` conv can be replaced by an `1 x n` followed by an `n x 1` (medium-sized feature maps).

### Visual Geometry Group (VGG)

VGG is a convolutional neural network architecture proposed by researchers (Simonyan _et al._ [Very Deep Convolutional Networks for Large-Scale Image Recognition, ICLR 2015](https://arxiv.org/abs/1409.1556v6)) from the University of Oxford. VGG shined at the ImageNet Large Scale Visual Recognition Challenge, [ILSVRC](https://www.image-net.org/about.php)

<div class="reno-gallery">
<img src="https://datascientest.com/de/files/2021/04/illu_VGG_Plan-de-travail-1.png" class="grid-w33" />
<img src="https://datascientest.com/de/files/2021/04/illu_VGG-02.png" class="grid-w33" />
<img src="https://viso.ai/wp-content/uploads/2021/10/how-vgg-works-convolutional-neural-network.jpg" class="grid-w33" />
</div>

Popular **VGG-16** or **VGG-19** consists of 16 or 19 convolutional layers respectively.

- **Input**: VGG takes in an image input size of 224×224. Creators cropped out the center 224×224 patch in each image for the ImageNet competition.
- **Convolutional Layers**: VGG uses 3x3 conv layers (minimal receptive field) as well as 1×1 conv filters (linear transformation).
  - ReLU (from AlexNet, training time reduction than sigmoid) is also used.
  - Stride (the number of pixel shifts over the input matrix) is fixed at 1 pixel, keeping the spatial resolution preserved.
- **Hidden Layers**: Use ReLU.
- **Fully-Connected** (FC) Layers: Has 3 FC layers. The first two each has 4096 channels, and the third has 1000 channels.

### Residual Networks (ResNets)

Introduced by _He et al._ [Deep Residual Learning for Image Recognition, CVPR 2016](https://ar5iv.labs.arxiv.org/html/1512.03385v1), ResNets were designed to address the issue where deeper network has higher training error, and thus test error (_first image_ in the gallery below). Likely due to the gradient vanishing problem (limit for small floating number stored in each tensor) from back propagation for deeper networks.

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x1.png" class="grid-w40" />
<img src="https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x2.png" class="grid-w33" />
<img src="https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x3.png" class="grid-w10" />
</div>

ResNets introduce a _deep residual learning_ framework (second image in the gallery above). _Shorting_ some of the layers for better back propagation and yields better performance.

#### ResNeXt

Introduced in [Aggregated Residual Transformations for Deep Neural Networks](https://ar5iv.labs.arxiv.org/html/1611.05431v2). Idea: more independent heads during learning results in better performance.

<figure class="reno-figure">
  <img src="https://ar5iv.labs.arxiv.org/html/1611.05431/assets/x1.png" alt="A block of ResNeXt" />
  <figcaption>**Left**: A block of ResNet. **Right**: A block of ResNeXt with cardinality=32, with roughly the same complexity. A layer is shown as `(# in channels, filter size, # out channels)`.</figcaption>
</figure>

Here is the performance (from `Figure 5`):

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/1611.05431/assets/x5.png" class="grid-w50" />
<img src="https://ar5iv.labs.arxiv.org/html/1611.05431/assets/x6.png" class="grid-w50" />
</div>

> Training curves on ImageNet-1K. `Left`: ResNet/ResNeXt-50 with preserved complexity ( ~4.1 billion FLOPs, ~25 million parameters); `Right`: ResNet/ResNeXt-101 with preserved complexity ( ~7.8 billion FLOPs, ~44 million parameters).

### DenseNet

Introduced in [Densely Connected Convolutional Networks, CVPR 2017](https://ar5iv.labs.arxiv.org/html/1608.06993v5), a DenseNet is a type of convolutional neural network uses _dense_ connections between layers through Dense Blocks.

> To ensure maximum information flow between layers in the network, we connect **all** layers (with matching feature-map sizes) directly with each other. To preserve the feed-forward nature, each layer obtains additional inputs from **all** preceding layers and passes on its own feature-maps to **all** subsequent layers

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x1.png" class="grid-w40" />
<img src="https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x2.png" class="grid-w60" />
<img src="https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x3.png" class="grid-w60" />
</div>

### EfficientNet

EfficientNet [EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks](https://ar5iv.labs.arxiv.org/html/1905.11946v5) is a CNN architecture and scaling method that **uniformly** scales **all** dimensions of `depth/width/resolution` using a compound coefficient (huge amount of computational power).

[EfficientNet](https://ar5iv.labs.arxiv.org/html/1905.11946/assets/x2.png)

## Vision Transformer (ViT)

From [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://ar5iv.labs.arxiv.org/html/2010.11929v2)

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/2010.11929/assets/x1.png"
class="grid-w33"/>
<img src="https://ar5iv.labs.arxiv.org/html/2010.11929/assets/x6.png" class="grid-w33" />
</div>

### Vision-and-Language Transformer (ViLT)

[ViLT: Vision-and-Language Transformer Without Convolution or Region Supervision](https://ar5iv.labs.arxiv.org/html/2102.03334v2), ICML(International Conference on Machine Learning) 2021.

![ViLT overview](https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x6.png "Model overview: A large transformer putting in word embedding and image imbedding with *(directly adding)* positional encoding.")

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x2.png" class="grid-w25"/>
<img src="https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x3.png" class="grid-w25"/>
<img src="https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x4.png" class="grid-w20"/>
<img src="https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x5.png" class="grid-w20"/>
</div>

The article also mentioned 4 categories of vision-and-language models (`VE`, `TE`, and `MI` are _short_ for `visual embedder`, `textual embedder`, and `modality interaction`, respectively.)

### BERT Pre-Training of Image Transformers (BEiT)

[BEiT: BERT Pre-Training of Image Transformers](https://ar5iv.labs.arxiv.org/html/2106.08254v2), ICLR 2022. (Bidirectional Encoder Representations from Transformers `BERT`, from ACL 2019, is actually a language model)

![BEiT](https://ar5iv.labs.arxiv.org/html/2106.08254/assets/x1.png "Overview of BEiT pre-training. Masked image patches + linearize + positional embedding, some knowledge distillation presented too.")

[VL-BEiT: Generative Vision-Language Pretraining](https://ar5iv.labs.arxiv.org/html/2206.01127v2), is a bidirectional multimodal Transformer learned by generative pretraining.

![VL-BEiT](https://ar5iv.labs.arxiv.org/html/2206.01127/assets/x1.png "VL-BEiT is pretrained by masked prediction on both monomodal and multimodal data with a shared Transformer ,like `VL` + `BEiT`.")

#### Masked Autoencoders (MAE)

[Masked Autoencoders Are Scalable Vision Learners](https://ar5iv.labs.arxiv.org/html/2111.06377), CVPR 2022. (strictly speaking, NOT ViT)

<figure class="reno-figure">
  <img src="https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png" alt="Figure 1: MAE architecture" />
  <figcaption>**Figure 1**: MAE architecture. During pre-training, a large random subset of image patches (*e.g*., 75%) is masked out. The encoder is applied to the small subset of visible patches. Mask tokens are introduced after the encoder, and the full set of encoded patches and mask tokens is processed by a small decoder that reconstructs the original image in pixels. After pre-training, the decoder is discarded and the encoder is applied to uncorrupted images (full sets of patches) for recognition tasks.</figcaption>
</figure>

### Contrastive Language-Image Pre-training (CLIP)

Released by OpenAI from [Learning Transferable Visual Models From Natural Language Supervision](https://ar5iv.labs.arxiv.org/html/2103.00020v1). CLIP _jointly_ trains an `image encoder` and a `text encoder` to predict the correct pairings of a batch of (image, text) training examples, and was trained from scratch on a dataset of 400 million (image, text) pairs.

[GitHub: OpenAI/CLIP](https://github.com/OpenAI/CLIP)

> Contrastive learning is a self-supervised learning approach where the model learns to differentiate between similar and dissimilar data points. The core idea is to bring similar data points (positives) closer together in the feature space while pushing dissimilar ones (negatives) apart.

<figure class="reno-figure">
  <img src="https://raw.githubusercontent.com/openai/CLIP/main/CLIP.png" alt="clip img figure 1" />
  <figcaption>**Figure 1** Summary of CLIP approach. CLIP `jointly` trains an image encoder and a text encoder to predict the correct pairings of a batch of (image, text) training examples, while standard image models **jointly** train an image feature extractor and a linear classifier to predict some label. At test time the learned text encoder synthesizes a zero-shot linear classifier by embedding the names or descriptions of the target dataset’s classes.</figcaption>
</figure>

> **Little fun fact from the paper**: The largest ResNet model, RN50x64, took 18 days to train on 592 V100 GPUs while the largest Vision Transformer took 12 days on 256 V100 GPUs

### Segment Anything Model (SAM)

[Segment Anything](https://ar5iv.labs.arxiv.org/html/2304.02643v1), ICCV 2023. SAM uses its own dataset with 1 billion masks on 11M licensed and privacy respecting images (SAM's image encoder outputs 𝐶 × 𝐻 × 𝑊 image embedding, which was built upon Masked Autoencoders, MAE).

[GitHub: facebookresearch/segment-anything](https://github.com/facebookresearch/segment-anything)

![An overview of the SAM model](https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x1.png "An overview of the SAM model")

#### SAM2

[SAM 2: Segment Anything in Images and Videos]()

## Stacked Hourglass Networks

Stacked Hourglass Networks are introduced by Newell et al. in [Stacked Hourglass Networks for Human Pose Estimation](https://arxiv.org/pdf/1603.06937v2)

![Featured-img-stacked-hourgless](https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-23_at_12.49.50_PM.png)

## DeepPose

The DeepPose paper [DeepPose: Human Pose Estimation via Deep Neural Networks](https://ar5iv.labs.arxiv.org/html/1312.4659), published by Google researchers at **_CVPR_** (`Conference on Computer Vision and Pattern Recognition`) in 2014. DeepPose was a pioneering approach at that time to _human pose estimation_ using Deep Neural Networks (DNNs).

> The core idea of the paper is to frame pose estimation as a DNN-based regression problem, predicting the coordinates of body joints `directly` from images (instead of treating it like a **_traditional_** classification methods)

<figure class="reno-figure">
  <img src="https://ar5iv.labs.arxiv.org/html/1312.4659/assets/x1.png" alt="Abstract purple artwork" />
  <figcaption>**Figure 2** from the [DeepPose]() paper [Jr Korpa](https://ar5iv.labs.arxiv.org/html/1312.4659)</figcaption>
</figure>

The method proposed a cascade of DNN regressors to _iteratively_ refine pose predictions, starting with a _rough estimate_ and improving it through _successive stages_.

## LLaVA, Large Language and Vision Assistant

As a GPT-V alternative, researchers _(Haotian Liu, Chunyuan Li , Qingyang Wu and Yong Jae Lee)_ used Language-only GPT-4 to generate _multimodal_ language-image instruction-following data. By instruction tuning on such generated data, we introduce LLaVA

## Feature Pyramid Network (FPN)

<figure class="reno-figure">
  <img src="https://production-media.paperswithcode.com/methods/new_teaser_TMZlD2J.jpg" alt="FPN comparing to others" />
  <figcaption>*Figure 1* from the original paper [by Belongie2 et al.](https://arxiv.org/pdf/1612.03144v2). (a) - (c) are older methods. **(a)** uses an image pyramid to build a feature pyramid (image at different scales). Features are computed (via CNN) on each of the image scales independently, which is slow. **(b)** single scale feature (like a VGG16), losing critical info. **(c)** is like sampling over CNN **(d)** FPN shares similarity between b and c, but multiple features at different scales got combined -- features goes through some down-sampling and provide some *feedbacks*, like BLSTM</figcaption>
</figure>

FPN is used in a lot of further development including faster R-CNN, Mask R-CNN, Single-Shot Detector (SSD), YOLO

<figure class="reno-figure">
  <img src="https://ar5iv.labs.arxiv.org/html/1612.03144/assets/x3.png" alt="" />
  <figcaption>Prediction were made on every single layer. 1 x 1 convolution used to change channel dimensions, *and* some up-sampling method, Nearest Interpolation, Bilinear Interpolation, Bicubic Interpolation, etc.</figcaption>
</figure>

### Pyramid Vision Transformer (PVT)

PVT, or Pyramid Vision Transformer, was introduced in [Pyramid Vision Transformer: A Versatile Backbone for Dense Prediction without Convolutions](https://arxiv.org/pdf/2102.12122v2) at `ICCV` 2021

<figure class="reno-figure">
  <img src="https://pbs.twimg.com/media/EvCVJPYUYAMg0mJ?format=jpg&name=large" alt="PVT abstract graph" />
  <figcaption>Multi-scale feature fusion in space, putting ideas from CNN into ViT, from (a) to (c).</figcaption>
</figure>

## Detection Transformer(DETR)

DETR, introduced in [End-to-End Object Detection with Transformers](https://ar5iv.labs.arxiv.org/html/2005.12872v3) is a set-based object detector using a transformer on top of a convolutional backbone

<figure class="reno-figure">
  <img src="https://ar5iv.labs.arxiv.org/html/2005.12872/assets/x2.png" alt="" />
  <figcaption>FFN is feed forward network</figcaption>
</figure>

### DETR with Improved deNoising anchOr boxes (DINO)

DINO is a state-of-the-art end-to-end object detector, using a contrastive way for denoising training.
<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/images/ap_r50_alllllll.png" class="grid-w33" />
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x1.png" class="grid-w33" />
</div>

DINO achieves higher AP (Average Precision, `true positives` / `true positives + false positives`, higher the better) under less epochs while having a smaller model size, ICLR 2023.

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x2.png" class="grid-w33" />
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x3.png" class="grid-w33" />
</div>

Unlike `DETR`, which takes the _largest_ feature map for subsequent work, DINO takes feature maps from various scales. A `positional embedding` is used to help the transformer. Its `Contrastive DeNoising (CDN)` training section (ground true, GT + noise) is different from DETR, containing `group0` and `group1`

- Both groups contains `positive queries` and `negative queries`.
- $\lambda_{1}$ and $\lambda_{2}$ adjusts how object stands out from the background (the size), adjusting the noise level.
- `CDN group0` has lower noise background, hoping to learn the `ground truth boxes`.
- `CDN group1` has higher noise, hoping to learn `no object`.

<div class="reno-gallery">
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x7.png"
class="grid-w33"/>
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x8.png" class="grid-w33" />
<img src="https://ar5iv.labs.arxiv.org/html/2203.03605/assets/images/convergence_comp_eccv2.png" class="grid-w33" />
</div>

DINO uses `mixed query selection`. Also `look forward twice` (adding more connection for back-propagation), achieving great performance (DINO is around 500 epochs)
