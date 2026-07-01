---
title: "Yet another gentle intro to the YOLO-NAS model"
description: "Navigate DevOps, MLOps, and Kaizen in AWS, Azure, and GCP"
date: 2024-04-29
# series: ["Image Generation"]
# series_order: 1
showAuthor: false
showTableOfContents: true
showHero: true
heroStyle: background
categories: "machine-learning-theory"
cover: "./featured.jpg"
---


YOLO-NAS delivers state-of-the-art (SOTA) performance with the unparalleled accuracy-speed performance.

YOLO-NAS is a `Apache-2.0 license` model created by **_Deci AI_** (now acquired by _NVIDIA_) that combines YOLO (You Only Look Once) object detection with Neural Architecture Search (NAS) to create a more _efficient_ and _accurate_ object detector. [[see this Nvidia article for details](https://developer.nvidia.com/blog/discovering-gpu-friendly-deep-neural-networks-with-unified-neural-architecture-search/)]

## A little overview for YOLO-NAS

### How YOLO-NAS got trained

YOLO-NAS undergoes a multi-phase training process. It was pre-trained on the `Objects365` dataset (_2 million images under 365 categories, 25-40 epochs on NVIDIA RTX A5000 x8_) and the COCO pseudo-labeled dataset. There was also Knowledge Distillation (KD) and Distribution Focal Loss (DFL) used.

<span class="reno-badge">
Knowledge Distillation (KD)
</span>

What is `KD`? Knowledge Distillation is the process involves transferring the knowledge from a large model or a set of models to one smaller model.

### YOLO-NAS's Model Structure

> Checkout this Colab Notebook [YOLO-NAS Playground](https://github.com/renocrypt/renocrypt-machine-learning/blob/main/YOLO_NAS_playground.ipynb) for details

_Here is a little trick to the YOLO-NAS architecture_

```python
!pip install torchinfo
from torchinfo import summary

summary(model = yolo_nas,
       input_size = (16,3,640,640),
       col_names = ['input_size',
                   'output_size',
                   'num_params',
                   'trainable'],
       col_width = 20,
       row_settings = ['var_names'])
```

## Interpret the YOLO-NAS outputs

The output of YOLO-NAS inference is an `ImageDetectionPrediction` object. This object contains 3 `fields`:

- `image`
- `class_names`
- `prediction`
