---
title: "What is OpenMMLab and how it is used in computer vision"
description: "Navigate DevOps, MLOps, and Kaizen in AWS, Azure, and GCP"
date: 2024-05-20
# series: ["Image Generation"]
# series_order: 1
showAuthor: false
showTableOfContents: true
showHero: true
heroStyle: background
categories: "machine-learning-theory"
tags: ["object-detection", "machine-learning"]
cover: "./featured.jpg"
---


OpenMMLab is a comprehensive `open-source` platform developed to accelerate research and development in computer vision.

<span class="reno-badge">
OpenMM Lab
</span>

[OpenMMLab](https://openmmlab.com/) serves as **a collection of toolkits and frameworks** for a wide range of **_computer vision (CV)_** tasks, _ie_. object detection, semantic segmentation, pose estimation, and optical character recognition (OCR). Built on top of `PyTorch`, it has become one of the most popular and influential repositories for computer vision, bridging the gap between academic research and industrial applications. Check out the [OpenMMLab Github](https://github.com/open-mmlab)

## Core Components of `OpenMMLab`

<aside class="reno-alert">

**MMDetection**: A versatile toolbox for _object detection_ and _instance segmentation_. It supports a wide array of models, including `Faster R-CNN`, `YOLO`, and `RetinaNet`, allowing easy customization and training on custom datasets. MMDetection is a go-to framework for researchers and practitioners working on tasks like autonomous driving, security, and more.

</aside>
</br>
<aside class="reno-alert">

**MMSegmentation**: `Semantic segmentation` component by supporting state-of-the-art (SOTA) models and facilitates experiments with various backbones and training strategies. MMSegmentation is useful in quantitative fields like medical imaging where _precise_ pixel-level classification is crucial.

</aside>
</br>
<aside class="reno-alert">

**MMPose**: A human pose estimation component handles tasks such as `full-body keypoint detection` and even more specialized tasks like `facial landmark detection`. MMPose supports multiple backbones and is designed to be modular.

</aside>
</br>
<aside class="reno-alert">

**MMOCR**: Tailored for `optical character recognition(OCR)` tasks, which has various models for text detection and recognition.

</aside>
</br>
<aside class="reno-alert">

**MMDeploy**: A deployment framework that allows models developed using OpenMMLab toolkits to be efficiently deployed `across different hardware and software`.

</aside>

## OpenMM and Colab

Open Google Colab and start a new notebook.

<span class="reno-badge">
Run in Colab
</span>
<br>
<aside class="reno-alert">

OpenMM is _community driven_, there may be some inconsistencies in their documentation

</aside>

Recent Google Colab has a built-in `torch`:`Version: 2.3.1+cu121` and `CUDA 12.2`, it should generally work with the following steps

Start with

1. `!pip3 install -q openmim` in its own cell because the kernel may _restart_ after you run, simply **_re-run_** it and the following lines should work

2. Then, run the folowing two lines. `mmcv` may actually installed with a version not fully compatible with `2.2.0`, but its okay, simply address that in the next steps.

   ```python
   !mim install -q mmengine
   !mim install -q mmcv
   ```

   lower version of `mmcv` may not work, due to the newer versions of the default `python` and `torch` in colab.

3. Try to build the `mmdetect` and `mmpose` from its source, therefore clone their repos. In another cell, run the following.

   ```python
   !git clone https://github.com/open-mmlab/mmdetection.git
   !git clone https://github.com/open-mmlab/mmpose.git
   ```

   [GitHub: open-mmlab/mmdetection](https://github.com/open-mmlab/mmdetection)
   [GitHub: open-mmlab/mmpose](https://github.com/open-mmlab/mmpose)

4. Do a _Editable Installation_ (`-e`) for `mmdetect` and `mmpose`.

   1. [You may no longer need it if more updates take place] Visit `(/comtent)/mmdetection/mmdet/` folder. Inside `__init__.py` change `'2.2.0'` in the line `mmcv_maximum_version = '2.2.0'` (should be line 9) into `'2.2.1` and `ctrl+s` or `command+s` to save.
   2. Then run the following to install.

      ```python
      !pip install -q -e ./mmdetection
      !pip install -q -r ./mmpose/requirements.txt
      !pip install -q -e ./mmpose
      ```

<aside class="reno-alert">

**Warning!** May see some kind of `mmdet.apis modules not found` error during runs in Colab, likely due to `sys.path` not having the correct items in, run:

```python
import sys
print(sys.path)
sys.path.append('/content/mmdetection')
sys.path.append('/content/mmpose')
```

</aside>

```

```
